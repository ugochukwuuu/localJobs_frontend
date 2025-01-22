<script setup>
    import { RouterLink, useRoute } from 'vue-router';
    import { defineProps } from 'vue';
    import "@/assets/stylings/userRoles.css"

    const isActive = (routePath) => {
      const route = useRoute();
      return route.path === routePath;
    }

    // const props = defineProps ({
    //     isFreelancer:{
    //         type: Boolean,
    //         default: true
    //     },
    //     isFreelancer:{
    //         type: Boolean,
    //         default: true
    //     }
    // })

    const userRole = localStorage.getItem('userRole')
</script>

<template>
    <nav class="">
      <div class=" main-nav-cont d-flex align-items-center justify-content-between">
            <RouterLink class="" to="/">
              <span class=""
                >LOCAL JOBS</span
              >
            </RouterLink>

              <div class="nav-links d-flex">

                <RouterLink 
                  to="/freelancer/jobs"
                  v-if="userRole == 'freelancer'"
                  :class="[isActive('/freelancer/jobs')?'active':'normal']"
                  >Jobs</RouterLink>

                <RouterLink 
                  to="/recruiter/jobs"
                  v-if="userRole == 'recruiter'"
                  :class="[isActive('/recruiter/jobs')?'active':'normal']"
                  >Jobs</RouterLink>

                <RouterLink
                  to="/freelancer/proposals"
                  v-if="userRole == 'freelancer'"
                  :class="[isActive('/freelancer/proposals')?'active':'normal']"
                  >Proposals</RouterLink
                >
                <RouterLink
                  to="/recruiter/applicants"
                  v-if="userRole == 'recruiter'"
                  :class="[isActive('/recruiter/applicants')?'active':'normal']"
                  >Applicants</RouterLink
                >

                <RouterLink
                  to="/freelancer/profile"
                  v-if="userRole == 'freelancer'"
                  :class="[isActive('/freelancer/profile')?'active':'normal']"
                  >Profile</RouterLink
                >
                <RouterLink
                  to="/recruiter/profile"
                  v-if="userRole == 'recruiter'"
                  class = "profile-link"
                  :class="[isActive('/recruiter/profile')?'active':'normal']"
                  >
                  <i class="pi pi-user"></i>
                  </RouterLink
                >

                <button @click="logoutFunct" class = "logout-btn">
                logout
                <i class="pi pi-sign-out"></i>
                </button>
              </div>


      </div>
    </nav>

</template>

<style scoped>
    
</style>