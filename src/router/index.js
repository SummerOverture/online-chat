import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
    }, {
      path: '/',
      name: 'online-chat',
      component: () => import('@/pages/chat'),
    },
  ],
});
