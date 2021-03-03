import { createRouter, createWebHistory } from 'vue-router'
import CharacterCardContainer from '../views/CharacterCardContainer.vue'
import CharacterProfile from '../views/CharacterProfile.vue'
import EpisodesList from '../views/EpisodesList.vue'

const routes = [
  {
    path: '/cards',
    name: 'Cards',
    component: CharacterCardContainer
  },
  {
    path: '/profile/:char_id',
    name: 'Profile',
    component: CharacterProfile,
    props: true,
  },
  {
    path: '/episodes',
    name: 'EpisodesList',
    component: EpisodesList
  },
  {
    path: '/',
    name: 'Cards',
    component: CharacterCardContainer
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
