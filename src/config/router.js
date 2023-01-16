import { createRouter, createWebHistory } from 'vue-router';

// Views
import HomeView from '@/views/HomeView/index.vue';
const QuizView = () => import('@/views/QuizView/index.vue');
const ResultView = () => import('@/views/ResultView/index.vue');

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/quiz',
    component: QuizView,
  },
  {
    path: '/result',
    component: ResultView,
  },
];

const router = createRouter({
  history: createWebHistory('/quizzo/'),
  routes,
});

export default router;
