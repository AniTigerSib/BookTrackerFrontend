import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import(/* webpackChunkName: "book" */ '../views/BookPageView.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import(/* webpackChunkName: "favourites" */ '../views/FavouritesView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFoundPageView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/LoginView.vue'),
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('../views/RegisterView.vue'),
    // }
  ],
})

export default router
