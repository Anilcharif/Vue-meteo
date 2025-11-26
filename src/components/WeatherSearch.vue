<script setup>
import { useWeatherStore } from '../stores/weatherStore'
import { onMounted } from 'vue'

const store = useWeatherStore()

onMounted(() => {
  // Chargement initial
  store.fetchWeather()
})

const handleSubmit = () => {
  store.fetchWeather()
}
</script>

<template>
  <section class="search">
    <form class="search-row" @submit.prevent="handleSubmit">
      <label class="search-label">
        Ville
        <input
          v-model="store.cityInput"
          type="text"
          class="search-input"
          placeholder="Paris, Lyon, Marseille..."
        />
      </label>
      <button class="btn-primary" type="submit" :disabled="store.loading">
        <span v-if="!store.loading">Mettre à jour</span>
        <span v-else>Chargement...</span>
      </button>
    </form>

    <p v-if="store.error" class="search-error">
      {{ store.error }}
    </p>
  </section>
</template>
