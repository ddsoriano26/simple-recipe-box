<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Meal } from '@/utils/types.ts'
import MealCard from '@/components/MealCard.vue'
import FavoriteRecipes from '@/components/FavoriteRecipes.vue'

const meals = ref<Meal[]>([])
const loading = ref(false)
const showFavorites = ref(false)

async function fetchRecipes() {
  loading.value = true
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    const data = await response.json()
    meals.value = data.meals
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}

function toggleShowFavorites() {
  showFavorites.value = !showFavorites.value
  if (!showFavorites.value) fetchRecipes()
}

onMounted(() => {
  fetchRecipes()
})
</script>

<template>
  <h1>Simple Recipe Box</h1>
  <!-- View when "Show all" -->
  <div v-show="!showFavorites">
    <button @click="toggleShowFavorites">Show favorites only</button>
    <text v-show="loading">Loading...</text>
    <div v-show="!loading" class="list">
      <div class="list" v-show="!loading" v-for="meal in meals" :key="meal.idMeal">
        <MealCard :meal="meal" />
      </div>
    </div>
  </div>
  <!-- View when "Show favorites" -->
  <div v-if="showFavorites">
    <button v-show="showFavorites" @click="toggleShowFavorites">Show all</button>
    <FavoriteRecipes />
  </div>
</template>

<style>
.list {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: center;
}

h1 {
  width: 100%;
  display: flex;
  justify-content: center;
}

button:hover {
  cursor: pointer;
}
</style>
