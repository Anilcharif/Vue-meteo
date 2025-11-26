// src/stores/activityStore.js
import { defineStore } from 'pinia'

const STORAGE_KEY = 'day-planner::activities'

function loadInitial() {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export const useActivityStore = defineStore('activities', {
  state: () => ({
    items: loadInitial()
  }),
  getters: {
    indoor(state) {
      return state.items.filter(a => a.type === 'indoor')
    },
    outdoor(state) {
      return state.items.filter(a => a.type === 'outdoor')
    }
  },
  actions: {
    addActivity({ label, type }) {
      const trimmed = label.trim()
      if (!trimmed || !type) return
      this.items.unshift({
        id: crypto.randomUUID(),
        label: trimmed,
        type, // 'indoor' | 'outdoor'
        createdAt: new Date().toISOString()
      })
      save(this.items)
    },
    removeActivity(id) {
      this.items = this.items.filter(a => a.id !== id)
      save(this.items)
    }
  }
})
