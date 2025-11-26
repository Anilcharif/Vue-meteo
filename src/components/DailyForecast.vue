<script setup>
import { useWeatherStore } from '../stores/weatherStore'

const store = useWeatherStore()

const formatDate = (raw) => {
  if (!raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit'
  })
}
</script>

<template>
  <article class="card forecast">
    <h2>Prochains jours</h2>

    <div v-if="store.loading" class="placeholder">
      Chargement des prévisions...
    </div>

    <div v-else-if="!store.daily.length" class="placeholder">
      Aucune prévision disponible.
    </div>

    <ul v-else class="forecast-list">
      <li
        v-for="(day, index) in store.daily"
        :key="day.date"
        class="forecast-item"
      >
        <div class="day-label">
          <span class="day-name">
            {{ index === 0 ? "Aujourd'hui" : formatDate(day.date) }}
          </span>
        </div>
        <div class="day-temps">
          <span class="t-max">{{ day.tMax }} °C</span>
          <span class="t-min">{{ day.tMin }} °C</span>
        </div>
        <div class="day-rain">
          <span v-if="day.rain != null">{{ day.rain }} mm</span>
          <span v-else>—</span>
        </div>
      </li>
    </ul>
  </article>
</template>
