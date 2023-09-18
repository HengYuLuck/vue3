import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/demo'
        },
        {
            path: '/table',
            name: 'table',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/TableExample.vue')
        },
        {
            path: '/demo',
            name: 'demo',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/demo/Demo.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/Dashboard.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'pageNotFound',
            component: () => import('@/components/PageNotFound.vue')
        },
    ]
})

export default router
