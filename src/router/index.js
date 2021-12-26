import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/views/secure/Dashboard";
import Login from "@/views/public/Login";
import Register from "@/views/public/Register";
import Secure from "@/views/secure/Secure";
import User from "@/views/secure/users/index";

const routes = [
    {
        path: '/',
        component: Secure,
        children: [
            {
                path: '',
                redirect:'dashboard'
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'users',
                name: 'users.index',
                component: User
            }
        ]

    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }


          {
              path: '/login',
              name: 'Login',
              component: Login
          },
          {
              path: '/register',
              name: 'Register',
              component: Register
          }


]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
