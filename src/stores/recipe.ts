import { defineStore } from 'pinia'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    favorites: [] as string[],
  }),
  actions: {
    addToFavorites(mealId: string) {
      console.log('Adding to favorites')
      if (!this.favorites.includes(mealId)) this.favorites.push(mealId)
      else console.warn('This meal has already been favorited!')
    },
  },
})
