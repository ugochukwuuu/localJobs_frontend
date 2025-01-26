<script setup>
import { RouterLink, useRoute } from "vue-router";
import { defineProps } from "vue";
import "@/assets/stylings/userRoles.css";
import { supabase } from "@/config/supabase";
import router from "@/Router/router";
import { ref } from "vue";
import { createToastInterface, useToast } from "vue-toastification";



const toast = useToast();

const route = useRoute();
const isActive = (routePath) => {
  return route.path === routePath;
};

const userId = localStorage.getItem("userId");
const logoutLoading = ref(false);
const logoutFunc = async () => {
  await logoutUser();

  localStorage.removeItem("userRole");
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
};

const logoutUser = async () => {
  if (confirm("Are you sure you want to log out?")) {
    logoutLoading.value = true;
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error logging out", error.message);
  } else {
    logoutLoading.value = false;
    router.replace("/auth/login").then(() => {
      location.reload();
    });
    
    toast.success("Logged out successfully"); 
  }
};
}
 

const userRole = localStorage.getItem("userRole");
</script>

<template>
  <nav class="header-nav montserrat">
    <div class="main-nav-cont d-flex align-items-center justify-content-between">
      <RouterLink class="logo" to="/">
        <span class="">LOCAL JOBS</span>
      </RouterLink>

      <div class="nav-links d-flex">
        <RouterLink
          :to="`/freelancer/jobs/${userId}`"
          v-if="userRole == 'freelancer'"
          :class="[isActive('/freelancer/jobs') ? 'active' : 'normal']"
          >Find Jobs</RouterLink
        >

        <RouterLink
          :to="`/recruiter/jobs/${userId}`"
          v-if="userRole == 'recruiter'"
          :class="[isActive('/recruiter/jobs') ? 'active' : 'normal']"
          >Manage Jobs</RouterLink
        >

        <RouterLink
          :to="`/freelancer/proposals/${userId}`"
          v-if="userRole == 'freelancer'"
          :class="[isActive('/freelancer/proposals') ? 'active' : 'normal']"
          >Proposals</RouterLink
        >
        <RouterLink
          :to="`/recruiter/applications/${userId}`"
          v-if="userRole == 'recruiter'"
          :class="[isActive('/recruiter/applications') ? 'active' : 'normal']"
          >Applications</RouterLink
        >

        <RouterLink
          :to="`/freelancer/profile/${userId}`"
          v-if="userRole == 'freelancer'"
          class="profile-link"
          :class="[isActive('/freelancer/profile') ? 'active' : 'normal']"
        >
          <i class="pi pi-user"></i>
        </RouterLink>
        <RouterLink
          :to="`/recruiter/profile/${userId}`"
          v-if="userRole == 'recruiter'"
          class="profile-link"
          :class="[isActive('/recruiter/profile') ? 'active' : 'normal']"
        >
          <i class="pi pi-user"></i>
        </RouterLink>

        <button @click="logoutFunc" class="logout-btn" :disabled="logoutLoading">
          <span v-if="!logoutLoading">Logout</span>
          <span v-else>Logging out...</span>
          <i v-if="logoutLoading" class="pi pi-spin pi-spinner"></i>
          <i v-if="!logoutLoading" class="pi pi-sign-out"></i>
        </button>
      </div>
    </div>

    <div v-if="isActive('/freelancer/jobs')" class="search-cont d-flex flex-column">
      <h1>Find your jobs easily</h1>
      <div class="search-bar-cont d-flex align-items-center">
        <div class="title-bar search-div">
          <i class="pi pi-search"></i>
          <input
            type="search"
            name=""
            id=""
            class="search-bar"
            placeholder="Job title or keyword"
          />
        </div>
        <div class="location-bar search-div">
          <i class="pi pi-map-marker"></i>
          <input type="search" name="" id="" class="search-bar" placeholder="Location" />
        </div>
        <button class="search-btn cursor">Search</button>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
