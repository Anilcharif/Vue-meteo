<script setup>
import WeatherSearch from './components/WeatherSearch.vue'
import WeatherSummary from './components/WeatherSummary.vue'
import DailyForecast from './components/DailyForecast.vue'
import ActivityPlanner from './components/ActivityPlanner.vue'
</script>

<template>
  <div class="shell">
    <main class="layout">
      <section class="panel panel-main">
        <header class="hero">
          <p class="hero-kicker">Vue 3 · Pinia · API météo</p>
          <h1>Day Planner</h1>
          <p class="hero-text">
            Une vue rapide sur la météo des prochains jours pour planifier ce que tu fais :
            trajets, sport, sorties, révisions à la maison, etc.
          </p>
        </header>

        <WeatherSearch />

        <section class="grid">
          <WeatherSummary />
          <DailyForecast />
        </section>
      </section>

      <!-- PANEL ACTIVITÉS -->
      <aside class="panel panel-notes">
        <h2>Notes & activités</h2>
        <p class="notes-text">
          La météo te donne le contexte. Les activités t’aident à décider quoi faire :
          sport, révisions, sorties, tâches perso…
        </p>

        <!-- Nouveau module -->
        <ActivityPlanner />
      </aside>
    </main>

    <footer class="footer">
      <span>Day Planner – appli front Vue 3 sans backend.</span>
      <span>API : geocoding &amp; prévisions via open-meteo.com.</span>
    </footer>
  </div>
</template>
