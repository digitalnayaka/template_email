export default {
  namespaced: true,
  state: {
    adsID: null,
  },
  mutations: {
    setAds: (state, payload) => {
      state.adsID = payload
    },
  },
  actions: {
    setAds: ({ commit }, payload) => {
      commit('setAds', payload)
    },
  },
  getters: {
    adsID: state => state.adsID,
  }
}