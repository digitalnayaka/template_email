import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/helper'
import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD2w8s4gCjiENlJdBORtSkZ6e5pghzVQDY",
  authDomain: "simotordev.firebaseapp.com",
  databaseURL: "https://simotordev.firebaseio.com",
  projectId: "simotordev",
  storageBucket: "simotordev.appspot.com",
  messagingSenderId: "1089890778962",
  appId: "1:1089890778962:web:12e78426fa6969e896448b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
