<script setup>
import { useWeatherStore } from '../stores/weatherStore'
import { computed } from 'vue'

const store = useWeatherStore()

const locationLabel = computed(() => {
  if (!store.location) return 'Aucun lieu sélectionné'
  const { name, country } = store.location
  return country ? `${name}, ${country}` : name
})

const currentTemp = computed(() => {
  return store.current?.temperature ?? null
})

const currentWind = computed(() => {
  return store.current?.windspeed ?? null
})
</script>

<template>
  <article class="card current">
    <h2>Météo actuelle</h2>
    <p class="location">{{ locationLabel }}</p>

    <div v-if="store.loading" class="placeholder">
      Récupération des données...
    </div>

    <div v-else-if="!store.current" class="placeholder">
      Aucune donnée disponible pour l&apos;instant.
    </div>

    <div v-else class="current-grid">
      <div>
        <p class="temp">
          {{ currentTemp }}<span class="unit">°C</span>
        </p>
        <p class="hint">Température actuelle</p>
      </div>
      <div class="current-extra">
        <p>Vent : <strong>{{ currentWind }} km/h</strong></p>
        <p v-if="store.daily.length">
          Max aujourd&apos;hui :
          <strong>{{ store.daily[0].tMax }} °C</strong>
        </p>
        <p v-if="store.daily.length">
          Min aujourd&apos;hui :
          <strong>{{ store.daily[0].tMin }} °C</strong>
        </p>
      </div>
    </div>
  </article>
</template>
