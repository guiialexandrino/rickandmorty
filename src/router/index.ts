import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Cards/Cards.vue'),
    },
    {
      path: '/character/:id',
      name: 'character',
      component: () => import('../views/InfoCharacter/InfoCharacter.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: () => import('../views/PageNotFound/PageNotFound.vue'),
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

export default router;
