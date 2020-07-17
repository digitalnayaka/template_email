export default {
  namespaced: true,
  state: {
    order: [],
  },
  mutations: {
    set: (state, payload) => {
      state.order = payload
    },
  },
  actions: {
    set: ({ commit }, payload) => {
      commit('set', payload)
    },
  },
  getters: {
    order: state => state.order,
  }
}