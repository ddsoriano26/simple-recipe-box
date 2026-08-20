<script setup lang="ts">
import type { Recipe } from '@/utils/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const loading = ref(false)

const recipe = ref<Recipe>()

async function fetchRecipe() {
  loading.value = true
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    const data = await response.json()
    recipe.value = data.meals[0]
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}

onMounted(() => {
  fetchRecipe()
})
</script>

<template>
  <div v-show="loading || !recipe">Loading...</div>
  <div v-show="!loading" class="container">
    <text>{{ recipe?.strMeal }}</text>
    <text>{{ `${recipe?.strArea}, ${recipe?.strCountry}` }}</text>
    <text>{{ recipe?.strInstructions }}</text>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
