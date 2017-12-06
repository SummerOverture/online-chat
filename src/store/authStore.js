export default {
  state: {
    authState: 200,
    nickname: '',
  },
  mutations: {
    serAuthState(state, authState) {
      state.authState = authState;
    },
  },
};
