import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
var app = new Vue({
  el: '#app',
  data() {
      return{

          url: "https://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/varsel.xml",

      }
  }, 
  
  methods: {
    
  }

/*
new Vue({
  render: h => h(App),
}).$mount('#app') 
*/
