export default {
  state: {
    authState: -1,
    userInfo: {
      nickname: '',
      id: '',
      image: 1,
    },
  },
  mutations: {
    setAuthState(state, authState) {
      state.authState = authState;
    },

    setUserInfo(state, { nickname, id, image }) {
      state.userInfo.nickname = nickname;
      state.userInfo.id = id;
      state.userInfo.image = image;
    },
  },
};
