<script setup>
import WeatherSearch from './components/WeatherSearch.vue'
import WeatherSummary from './components/WeatherSummary.vue'
import DailyForecast from './components/DailyForecast.vue'
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

      <aside class="panel panel-notes">
        <h2>Notes rapides</h2>
        <p class="notes-text">
          Utilise le panneau météo pour décider : travailler dehors, aller à la salle,
          prendre le vélo ou rester focus à l&apos;intérieur.
        </p>
        <p class="notes-small">
          Ce projet montre l&apos;intégration d&apos;une API publique (Open‑Meteo) avec Vue 3 et Pinia :
          gestion d&apos;état global, chargement, erreurs, affichage conditionnel.
        </p>
      </aside>
    </main>

    <footer class="footer">
      <span>Day Planner – appli front Vue 3 sans backend.</span>
      <span>API : geocoding &amp; prévisions via open-meteo.com.</span>
    </footer>
  </div>
</template>
