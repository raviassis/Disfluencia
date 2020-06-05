import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import NewSession from './views/newSession/NewSession.vue'
import EditSession from './views/editSession/EditSession.vue'
import Home from './views/home/Home.vue'
import Register from './views/register/Register.vue'
import Login from './views/login/Login.vue'
import axios from 'axios'
import authService from './services/authService'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.prototype.$http = axios

const routes = [
  { path: '/register', component: Register },
  { 
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      authService.logout();
      next();
    } 
  },
  {
    path: '/', component: Home,
    beforeEnter: (to, from, next) => {
      if (authService.isLogged()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '*', component: Home,
    beforeEnter: (to, from, next) => {
      if (authService.isLogged()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/session', component: NewSession,
    beforeEnter: (to, from, next) => {
      if (authService.isLogged()) {
        next();
      } else {
        next('/login');
      }

    }
  },
  {
    path: '/session/:id', component: EditSession,
    beforeEnter: (to, from, next) => {
      if (authService.isLogged()) {
        next();
      } else {
        next('/login');
      }
    }
  },
]

const router = new VueRouter({
  // mode:'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
