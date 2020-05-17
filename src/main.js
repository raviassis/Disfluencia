import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import NewSession from './views/newSession/NewSession.vue'
import EditSession from './views/editSession/EditSession.vue'
import Home from './views/home/Home.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$http = axios 

const routes = [
  { path: '/', component: Home},
  { path: '/session', component: NewSession},
  { path: '/session/:id', component: EditSession}
]

const router = new VueRouter({
  // mode:'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
