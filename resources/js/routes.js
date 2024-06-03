import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/auth/Login.vue'
import Register from './pages/auth/Register.vue'

import LoggedInLayout from './layout/LoggedInLayout.vue'

import Dashboard from './pages/Dashboard.vue'
import PostList from './pages/posts/ListPost.vue'
import PostCreate from './pages/posts/AddPost.vue'
import PostEdit from './pages/posts/EditPost.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            title: 'Register',
            path: '/register',
            name: 'register',
            component: () => Register
        },
        {
            title: 'Login',
            path: '/login',
            name: 'login',
            component: () => Login
        },
        {
            path: '',
            component: LoggedInLayout,
            children: [{
                    title: 'Dashboard',
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => Dashboard,
                    meta: { requiresAuth: true }
                },
                {
                    title: 'Posts',
                    path: '/posts',
                    name: 'posts',
                    component: () => PostList,
                    meta: { requiresAuth: true }
                },
                {
                    title: 'Create Post',
                    path: '/posts/create',
                    name: 'postCreate',
                    component: () => PostCreate,
                    meta: { requiresAuth: true }
                },
                {
                    title: 'Edit Post',
                    path: '/posts/:id',
                    name: 'postEdit',
                    component: () => PostEdit,
                    meta: { requiresAuth: true }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') // Check if token exists in local storage
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Route requires authentication
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            next({
                name: 'login',
                query: { redirect: to.fullPath } // Pass the current path as a query parameter to redirect back after login
            })
        } else {
            next() // Proceed to the route
        }
    } else {
        if (isAuthenticated) {
            next({
                name: 'dashboard'
            })
        }
        next() // Proceed to the route if authentication is not required
    }
})

export default router