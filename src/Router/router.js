import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/auth/Login.vue';
import RegisterView from '@/views/auth/Register.vue';
import JobsView from '@/views/auth/Jobs.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/auth/login',
            name: 'login',
            component:  LoginView,
        },
        {
            path: '/auth/register',
            name: 'register',
            component:  RegisterView,
        },
        {
            path: '/jobs',
            name: 'Jobs',
            component:  JobsView,
            meta: {requiresAuth: true}
        },
    ], 
});

    router.beforeEach((to, from, next) => {
        const isAuthenticated = localStorage.getItem('authToken'); // Example: Checking auth token
        if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' }); // Redirect to login if not authenticated
        } else {
        next(); // Allow navigation
        }
    });

export default router