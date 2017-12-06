// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import apiAuth from '@/api/auth';
import 'iview/dist/styles/iview.css';
import App from './App';

import router from './router';
import store from './store';

Vue.use(iView);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && store.state.authStore.authState !== 200) {
    apiAuth.checkAuth()
      .then((data) => {
        store.commit('setAuthState', 200);
        store.commit('setUserInfo', data);
        next();
      })
      .catch(() => {
        next({
          path: '/login',
        });
      });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
