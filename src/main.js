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
  apiKey: "AIzaSyB2fsNR4-M_6YBO65sF0x9MemAXLY_5gDQ",
  authDomain: "simotor-dna.firebaseapp.com",
  databaseURL: "https://simotor-dna.firebaseio.com",
  projectId: "simotor-dna",
  storageBucket: "simotor-dna.appspot.com",
  messagingSenderId: "73051776825",
  appId: "1:73051776825:web:250eaa838d239d94",
  measurementId: "G-23ZJ6QFKBV"
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
