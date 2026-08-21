<script setup lang="ts">
import type { Meal, Recipe } from '@/utils/types'
import { RouterLink } from 'vue-router'

defineProps<{
  meal: Meal | Recipe
}>()
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'MealRecipe', params: { id: meal.idMeal } }">
      <img v-bind:src="meal.strMealThumb" />
      <div class="name">
        <text>{{ meal.strMeal }}</text>
      </div>
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  border: 1px solid black;
  border-radius: 10px;
  overflow: auto;
  height: 200px;
  width: 300px;
  cursor: pointer;
}

img {
  width: 100%;
  height: auto;
  max-height: 80%;
  object-fit: cover;
}

.name {
  display: flex;
  max-width: 100%;
  height: auto;
  max-height: 20%;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  align-content: center;
}

text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
