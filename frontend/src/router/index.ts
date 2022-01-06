import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';
import Home from '@/views/Home.vue';
import Map from '@/views/Map.vue';
// import Vuex from '@/views/vuex.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },

  {
    path: '/element',
    name: 'Element',
    component: () => import('@/views/ElementPlus.vue'), // 懒加载组件
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
