import {createRouter, createWebHistory} from 'vue-router'

const loginView = () =>import('@/views/auth/Login.vue');
const registerView = ()=> import('@/views/auth/Register.vue');
const notFoundView = () => import('@/views/notFound.vue');

const freelancerSkeleton = () => import('@/views/freelancer/FreeLancerSkeleton.vue')
const freelancerJobsView = () => import('@/views/freelancer/Jobs.vue')
const freelancerProposalsView = () => import('@/views/freelancer/Proposals.vue')
const freelancerProfileView = () => import('@/views/freelancer/Profile.vue')

import recruiterSkeleton from '@/views/recruiter/RecruiterSkeleton.vue'
import recruiterJobsPostingView from '@/views/recruiter/JobPostings.vue'
import recruiterApplicationView from '@/views/recruiter/Proposals.vue'
import recruiterProfileView from '@/views/freelancer/Profile.vue'

// const userRole = localStorage.getItem('userRole');
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'home',
            component: notFoundView,
            meta:{requiresAuth:true},
            redirect(){
                const userRole = localStorage.getItem('userRole');
                const userId = localStorage.getItem('userId');

                if (userRole && userId) {
                    return `/${userRole}/jobs/${userId}`;
                  }

                return '/auth/login';
            }
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
            path: `/freelancer`,
            name: 'freelancer',
            component:  freelancerSkeleton,
            meta: { requiresAuth: true, allowedRoles: ['freelancer'] },
            children:[
                {
                    path: 'jobs/:userId',
                    name: 'Jobs',
                    component: freelancerJobsView
                },
                {
                    path: 'proposals/:userId',
                    name: 'Proposal',
                    component: freelancerProposalsView
                },
                {
                    path: 'profile/:userId',
                    name: 'Profile',
                    component: freelancerProfileView
                },
            ]
        },
        {
            path: `/recruiter`,
            name: 'recruiter',
            component:  recruiterSkeleton,
            meta: { requiresAuth: true, allowedRoles: ['recruiter'] },
            children:[
                {
                    path: 'jobs/:userId',
                    name: 'JobPostings',
                    component: recruiterJobsPostingView
                },
                {
                    path: 'applications/:userId',
                    name: 'Application',
                    component: recruiterApplicationView
                },
                {
                    path: 'profile/:userId',
                    name: 'Profile',
                    component: recruiterProfileView
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
    const isAuthenticated = localStorage.getItem('authToken'); // Check auth token
    const userRole = localStorage.getItem('userRole'); // Get user role
  
    // Block unauthenticated access to protected routes
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'login' });
    }
  
    // Block access if the route doesn't match the user's role
    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
      return next({ name: userRole }); // Redirect to role-specific home
    }
  
    next(); // Allow navigation if no rules are broken
  });
  
export default router