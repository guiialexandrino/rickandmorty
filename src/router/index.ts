import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'characters-main' },
    },
    {
      path: '/characters',
      name: 'characters-main',
      component: () => import('../views/Cards/Cards.vue'),
      children: [
        {
          path: ':number',
          name: 'characters',
          component: () => import('../views/Cards/Cards.vue'),
        },
      ],
      redirect: { name: 'characters', params: { number: 1 } },
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
