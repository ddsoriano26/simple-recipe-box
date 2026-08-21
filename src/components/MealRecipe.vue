<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import type { Recipe } from '@/utils/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const loading = ref(false)

const recipe = ref<Recipe>()

const recipeStore = useRecipeStore()

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

function favoriteRecipe() {
  if (recipe.value) recipeStore.addToFavorites(recipe.value?.idMeal)
  else console.log('Recipe does not exist!')
}

onMounted(() => {
  fetchRecipe()
})
</script>

<template>
  <main>
    <div v-show="loading || !recipe">Loading...</div>
    <div v-show="!loading" class="container">
      <img v-bind:src="recipe?.strMealThumb" />
      <text>{{ recipe?.strMeal }}</text>
      <button @click="favoriteRecipe">Favorite this recipe</button>
      <text>{{ recipe?.strCountry }}</text>
      <text>{{ recipe?.strInstructions }}</text>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

img {
  width: 300px;
  max-height: auto;
}

button {
  max-width: fit-content;
}
button:hover {
  cursor: pointer;
}
</style>
