import http from './httpClient';

export default {
  login(data) {
    return http.post({ url: '/login', data });
  },
  checkAuth() {
    return http.post({ url: '/login/checkAuth' });
  },
};
