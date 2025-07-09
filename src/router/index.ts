import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CheckoutPage from '@/pages/CheckoutPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/checkout', component: CheckoutPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
