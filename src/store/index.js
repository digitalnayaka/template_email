import Vue from 'vue'
import Vuex from 'vuex'
import alert from '@/store/alert'
import auth from '@/store/auth'
import dialog from '@/store/dialog'
import order from '@/store/order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    auth,
    dialog,
    order
  }
})
