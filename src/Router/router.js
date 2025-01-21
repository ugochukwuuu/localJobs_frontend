import {createRouter, createWebHistory} from 'vue-router'

const loginView = () =>import('@/views/auth/Login.vue');
const registerView = ()=> import('@/views/auth/Register.vue');
const jobsView = () => import('@/views/auth/Jobs.vue');
const notFoundView = () => import('@/views/notFound.vue');
const NavBarView = ()=> import('@/components/Navbar.vue');
const freelancerSkeleton = () => import('@/views/freelancer/FreeLancerSkeleton.vue')
const freelancerJobsView = () => import('@/views/freelancer/Jobs.vue')
const freelancerProposalsView = () => import('@/views/freelancer/Proposals.vue')
const freelancerProfilesView = () => import('@/views/freelancer/Profile.vue')
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'home',
            component: jobsView,
            meta:{requiresAuth:true}
        },
        {
            path: '/auth/login',
            name: 'login',
            component:  loginView,
        },
        {
            path: '/auth/register',
            name: 'register',
            component:  registerView,
        },
        {
            path: '/jobs',
            name: 'Jobs',
            component:  jobsView,
            meta: {requiresAuth: true}
        },
        {
            path: `/freelancer`,
            name: 'freelancer',
            component:  freelancerSkeleton,
            meta: {requiresAuth: true},
            children:[
                {
                    path: 'jobs',
                    name: 'Jobs',
                    component: freelancerJobsView
                },
                {
                    path: 'proposals',
                    name: 'Proposal',
                    component: freelancerProposalsView
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: freelancerProfilesView
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: notFoundView
        },
    ], 
});

    router.beforeEach((to, from, next) => {
        const isAuthenticated = localStorage.getItem('authToken'); // Example: Checking auth token
        if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' }); // Redirect to login if not authenticated
        } else {
        next(); // Allow navigation
        }
    });

export default router