import {createRouter, createWebHistory} from 'vue-router'

const loginView = () =>import('@/views/auth/Login.vue');
const registerView = ()=> import('@/views/auth/Register.vue');
const jobsView = () => import('@/views/auth/Jobs.vue');
const notFoundView = () => import('@/views/notFound.vue');
// const NavBarView = ()=> import('@/components/Navbar.vue');
const freelancerSkeleton = () => import('@/views/freelancer/FreeLancerSkeleton.vue')
const freelancerJobsView = () => import('@/views/freelancer/Jobs.vue')
const freelancerProposalsView = () => import('@/views/freelancer/Proposals.vue')
const freelancerProfileView = () => import('@/views/freelancer/Profile.vue')
const recruiterSkeleton = () => import('@/views/recruiter/RecruiterSkeleton.vue')
const recruiterJobsPostingView = () => import('@/views/recruiter/JobPostings.vue')
const recruiterProposalsView = () => import('@/views/recruiter/Proposals.vue')
const recruiterProfileView = () => import('@/views/freelancer/Profile.vue')

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
            meta: {requiresAuth: true, isFreelancer: true},
            children:[
                {
                    path: '/jobs/:userId',
                    name: 'Jobs',
                    component: freelancerJobsView
                },
                {
                    path: '/proposals/:userId',
                    name: 'Proposal',
                    component: freelancerProposalsView
                },
                {
                    path: '/profile/:userId',
                    name: 'Profile',
                    component: freelancerProfileView
                },
            ]
        },
        {
            path: `/recruiter`,
            name: 'recruiter',
            component:  recruiterSkeleton,
            meta: {requiresAuth: true, isrecruiter: true},
            children:[
                {
                    path: '/jobs/:userId',
                    name: 'Job Postings',
                    component: recruiterJobsPostingView
                },
                {
                    path: '/proposals/:userId',
                    name: 'Proposal',
                    component: recruiterProposalsView
                },
                {
                    path: '/profile/:userId',
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
    const userRole = localStorage.getItem('userRole'); // Check user role
  
    // If the user is not authenticated and tries to access a protected route, redirect to login
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'login' });
    }
  
    // Redirect to role-specific route only if the user is not already on the target route
    if (to.meta.requiresAuth) {
      if (userRole === 'freelancer' && to.name !== 'freelancer') {
        return next({ name: 'freelancer' });
      }
      if (userRole === 'recruiter' && to.name !== 'recruiter') {
        return next({ name: 'recruiter' });
      }
    }
  
    // Allow navigation if no conditions are met
    next();
  });
  

export default router