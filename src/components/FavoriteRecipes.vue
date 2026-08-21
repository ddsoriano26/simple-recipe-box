<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import type { Recipe } from '@/utils/types'
import { onMounted, ref } from 'vue'
import MealCard from './MealCard.vue'

const recipeStore = useRecipeStore()

const favoriteMeals = ref<Recipe[]>([])
const loading = ref(false)

async function populateRecipes() {
  loading.value = true
  await Promise.all(
    recipeStore.favorites.map(async (mealId: string) => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        )
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const data = await response.json()
        favoriteMeals.value.push(data.meals[0])
      } catch (err) {
        console.error(err)
      }
    }),
  )
  loading.value = false
}

onMounted(() => {
  populateRecipes()
})
</script>

<template>
  <div v-show="loading">Loading favorites...</div>
  <div v-show="!loading">
    <div v-show="favoriteMeals.length === 0">You have no favorited meals to show.</div>
    <div v-show="favoriteMeals.length > 0">
      <div v-show="!loading" class="list">
        <div class="list" v-for="meal in favoriteMeals" :key="meal.idMeal">
          <MealCard :meal="meal" />
        </div>
      </div>
    </div>
  </div>
</template>
