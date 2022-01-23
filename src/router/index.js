import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/views/secure/Dashboard";
import Login from "@/views/public/Login";
import Register from "@/views/public/Register";
import Secure from "@/views/secure/Secure";
import User from "@/views/secure/users/index";
import UserCreate from "@/views/secure/users/create";
import UserEdit from "@/views/secure/users/edit";
import Product from "@/views/secure/products/index";
import ProductCreate from "@/views/secure/products/create";
import ProductEdit from "@/views/secure/products/edit";
import RoleIndex from "@/views/secure/roles/index";
import RoleEdit from "@/views/secure/roles/edit";
import RoleCreate from "@/views/secure/roles/create";
import Orders from "../views/secure/orders/index";
import OrderItem from "../views/secure/orders/orderItem";
import Profile from "../views/secure/users/profile";
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
            },
            {
                path: 'users/create',
                name: 'users.create',
                component: UserCreate
            },
            {
                path: 'users/edit/:id',
                name: 'users.edit',
                component: UserEdit
            },
            {
                path: 'users/profile',
                name: 'users.profile',
                component: Profile
            },
            {
                path: 'products',
                name: 'products.index',
                component: Product
            },
            {
                path: 'products/create',
                name: 'products.create',
                component: ProductCreate
            },
            {
                path: 'products/edit/:id',
                name: 'products.edit',
                component: ProductEdit
            },
            {
                path: 'roles',
                name: 'roles.index',
                component: RoleIndex
            },
            {
                path: 'roles/edit/:id',
                name: 'roles.edit',
                component: RoleEdit
            },
            {
                path: 'roles/create',
                name: 'roles.create',
                component: RoleCreate
            },
            {
                path: 'orders',
                name: 'orders.index',
                component: Orders
            },
            {
                path: 'orders/view/:id',
                name: 'orders.view',
                component: OrderItem
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
