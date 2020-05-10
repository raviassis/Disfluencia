import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Session from './views/session/Session.vue'
import Home from './views/home/Home.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$http = axios 

const routes = [
  { path: '/', component: Home},
  { path: '/session', component: Session}
]

const router = new VueRouter({
  // mode:'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
