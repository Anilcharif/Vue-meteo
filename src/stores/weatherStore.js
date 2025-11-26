import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cityInput: 'Paris',
    location: null,
    current: null,
    daily: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchWeather() {
      if (!this.cityInput || !this.cityInput.trim()) return
      this.loading = true
      this.error = null

      try {
        const query = encodeURIComponent(this.cityInput.trim())
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=fr&format=json`
        )
        if (!geoRes.ok) {
          throw new Error('Erreur géocoding')
        }
        const geo = await geoRes.json()
        if (!geo.results || !geo.results.length) {
          throw new Error('Aucun lieu trouvé')
        }
        const place = geo.results[0]
        this.location = {
          name: place.name,
          country: place.country,
          latitude: place.latitude,
          longitude: place.longitude
        }

        const url = new URL('https://api.open-meteo.com/v1/forecast')
        url.searchParams.set('latitude', String(place.latitude))
        url.searchParams.set('longitude', String(place.longitude))
        url.searchParams.set('current_weather', 'true')
        url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum')
        url.searchParams.set('timezone', 'auto')
        url.searchParams.set('forecast_days', '4')

        const meteoRes = await fetch(url.toString())
        if (!meteoRes.ok) {
          throw new Error('Erreur météo')
        }
        const meteo = await meteoRes.json()

        this.current = meteo.current_weather || null
        const daily = meteo.daily || {}
        const out = []
        if (daily.time && Array.isArray(daily.time)) {
          for (let i = 0; i < daily.time.length; i++) {
            out.push({
              date: daily.time[i],
              tMax: daily.temperature_2m_max?.[i] ?? null,
              tMin: daily.temperature_2m_min?.[i] ?? null,
              rain: daily.precipitation_sum?.[i] ?? null
            })
          }
        }
        this.daily = out
      } catch (e) {
        console.error(e)
        this.error = e?.message || 'Erreur inconnue'
      } finally {
        this.loading = false
      }
    }
  }
})
