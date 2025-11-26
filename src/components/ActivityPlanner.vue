<script setup>
import { ref, computed } from 'vue'
import { useActivityStore } from '../stores/activityStore'
import { useWeatherStore } from '../stores/weatherStore'

const activities = useActivityStore()
const weather = useWeatherStore()

const label = ref('')
const type = ref('indoor') // indoor par défaut

const handleSubmit = () => {
  if (!label.value.trim()) return
  activities.addActivity({ label: label.value, type: type.value })
  label.value = ''
}

// Profil météo du jour
const todayProfile = computed(() => {
  if (!weather.daily.length) return null
  const today = weather.daily[0]
  const tMax = today.tMax ?? null
  const rain = today.rain ?? null

  if (tMax == null || rain == null) return null

  if (rain > 2 || tMax < 8) {
    return {
      mode: 'indoor',
      label: 'Météo plutôt pour rester en intérieur',
      detail: `Max ${tMax}°C · ${rain} mm de pluie`
    }
  }

  if (tMax >= 8 && tMax <= 25 && rain <= 2) {
    return {
      mode: 'outdoor',
      label: 'Bonne météo pour sortir ou faire du sport dehors',
      detail: `Max ${tMax}°C · ${rain} mm de pluie`
    }
  }

  return {
    mode: 'mix',
    label: 'Météo intermédiaire, à toi de choisir',
    detail: `Max ${tMax}°C · ${rain} mm de pluie`
  }
})

// Activités suggérées selon météo
const suggestedIndoor = computed(() =>
  todayProfile.value?.mode === 'indoor' || todayProfile.value?.mode === 'mix'
    ? activities.indoor
    : []
)

const suggestedOutdoor = computed(() =>
  todayProfile.value?.mode === 'outdoor' || todayProfile.value?.mode === 'mix'
    ? activities.outdoor
    : []
)

// Liste compacte pour "Focus du jour"
const focusList = computed(() => {
  const list = []
  if (suggestedIndoor.value.length) {
    list.push(...suggestedIndoor.value.slice(0, 2))
  }
  if (suggestedOutdoor.value.length) {
    list.push(...suggestedOutdoor.value.slice(0, 2))
  }
  return list
})
</script>

<template>
  <section class="activity-panel">
    <h2>Activités à caler</h2>
    <p class="activity-intro">
      Ajoute quelques activités que tu fais souvent (sport, révisions, tâches perso)
      et laisse la météo t’aider à choisir quoi faire aujourd’hui.
    </p>

    <form class="activity-form" @submit.prevent="handleSubmit">
      <input
        v-model="label"
        type="text"
        placeholder="Ex : footing, révision React, montage vidéo..."
        class="activity-input"
      />
      <select v-model="type" class="activity-select">
        <option value="indoor">Intérieur</option>
        <option value="outdoor">Extérieur</option>
      </select>
      <button type="submit" class="activity-btn">Ajouter</button>
    </form>

    <!-- SUGGESTION DU JOUR : TOUJOURS VISIBLE SI LA MÉTÉO EST CHARGÉE -->
    <div
      v-if="todayProfile"
      class="activity-focus"
      :data-mode="todayProfile.mode"
    >
      <p class="activity-hint-title">{{ todayProfile.label }}</p>
      <p class="activity-hint-detail">{{ todayProfile.detail }}</p>

      <ul v-if="focusList.length" class="activity-focus-list">
        <li v-for="item in focusList" :key="item.id">
          {{ item.label }}
          <span class="activity-chip">
            {{ item.type === 'indoor' ? 'intérieur' : 'extérieur' }}
          </span>
        </li>
      </ul>

      <p v-else class="activity-empty">
        Ajoute au moins une activité marquée
        <strong>intérieur</strong> ou <strong>extérieur</strong>
        pour obtenir une suggestion précise.
      </p>
    </div>

    <div class="activity-columns">
      <div>
        <h3>Activités intérieur</h3>
        <p v-if="!activities.indoor.length" class="activity-empty">
          Ajoute quelques idées : révisions, montage, lecture, etc.
        </p>
        <ul v-else class="activity-list">
          <li
            v-for="item in activities.indoor"
            :key="item.id"
            class="activity-item"
          >
            <span>{{ item.label }}</span>
            <button
              type="button"
              class="activity-remove"
              @click="activities.removeActivity(item.id)"
            >
              ×
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h3>Activités extérieur</h3>
        <p v-if="!activities.outdoor.length" class="activity-empty">
          Ajoute quelques idées : footing, marche, sortie, etc.
        </p>
        <ul v-else class="activity-list">
          <li
            v-for="item in activities.outdoor"
            :key="item.id"
            class="activity-item"
          >
            <span>{{ item.label }}</span>
            <button
              type="button"
              class="activity-remove"
              @click="activities.removeActivity(item.id)"
            >
              ×
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
