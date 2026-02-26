import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeliculasView from '../views/PeliculasView.vue'
import SeriesView from '../views/SeriesView.vue'
import DetalleView from '../views/DetalleView.vue'

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView 
  },
  { 
    path: '/peliculas', 
    name: 'peliculas',
    component: PeliculasView 
  },
  { 
    path: '/series', 
    name: 'series',
    component: SeriesView 
  },
  { 
    path: '/detalle/:id/:tipo', 
    name: 'detalle',
    component: DetalleView 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router