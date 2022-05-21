import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomeView from '/src/views/HomeView/index.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
