import axios from 'axios';
import store from '@/store';

const urlPrefix = process.env.NODE_ENV === 'development' ? '/api' : '';

export default {
  post({ url, data = {} }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${urlPrefix}${url}`, data)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            resolve(undefined);
          }
        })
        .catch(({ response }) => {
          if (response.status === '403') {
            store.commit('serAuthState', 403);
          }
          reject(response);
        });
    });
  },
};
