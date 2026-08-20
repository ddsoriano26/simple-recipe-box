<script setup lang="ts">
import type { Meal } from '@/utils/types'

defineProps<{
  meal: Meal
}>()
</script>

<template>
  <main>
    <img v-bind:src="meal.strMealThumb" />
    <div class="name">
      <text>{{ meal.strMeal }}</text>
    </div>
  </main>
</template>

<style scoped>
main {
  border: 1px solid black;
  border-radius: 10px;
  overflow: auto;
  height: 200px;
  width: 300px;
}

img {
  width: 100%;
  height: auto;
  max-height: 80%;
  object-fit: cover;
}

.name {
  display: flex;
  width: 100%;
  height: auto;
  max-height: 20%;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  align-content: center;
}
</style>
