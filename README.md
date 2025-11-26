# Day Planner – Vue 3 + Pinia + API météo

Petite application front développée avec **Vue 3**, **Pinia** et **Vite**.  
Elle interroge l'API publique [open-meteo.com](https://open-meteo.com/) pour afficher :

- la météo actuelle d'une ville
- les prévisions des prochains jours (températures min/max, pluie)

L'objectif est de disposer d'une vue rapide pour planifier sa journée (trajets, sport, sorties, travail à la maison...).

## Fonctionnalités

- Recherche de ville (via API de géocodage Open‑Meteo)
- Affichage de la météo actuelle
- Affichage des prochains jours
- Gestion du chargement et des erreurs (via Pinia)

## Démarrage

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173

## Stack

- Vue 3 (Composition API)
- Pinia (store global)
- Vite
- API Open‑Meteo (geocoding + forecast)
