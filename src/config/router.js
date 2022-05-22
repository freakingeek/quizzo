import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomeView from '/src/views/HomeView/index.vue';
const QuizView = import('/src/views/QuizView/index.vue');

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/quiz',
    component: QuizView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
