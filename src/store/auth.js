export default {
    namespaced: true,
    state: {
        user: null,
        token: null,
    },
    mutations: {
        set: (state, payload) => {
            state.user = payload
        },
        SET_TOKEN(state, payload) {
            state.token = payload
        }
    },
    actions: {
        set: ({ commit }, payload) => {
            commit('set', payload)
        },
        SET_TOKEN: ({ commit }, payload) => {
            commit('SET_TOKEN', payload)
        },
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        guest: state => state.user == null,
    }
}