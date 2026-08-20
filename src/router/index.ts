import MealRecipe from '@/components/MealRecipe.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/meal/:id',
      name: 'MealRecipe',
      component: MealRecipe,
    },
  ],
})

export default router
