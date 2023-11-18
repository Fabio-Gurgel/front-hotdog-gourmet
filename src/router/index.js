import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Administrador.vue'
import Usuario from '../views/Usuario.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
