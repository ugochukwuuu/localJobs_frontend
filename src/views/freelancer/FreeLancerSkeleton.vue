<script setup>
    import Navbar from '@/components/Navbar.vue';
    import { RouterView } from 'vue-router';
    import "@/assets/stylings/userRoles.css"
</script>

<template>
    <Navbar :isFreelancer="true" :isRecruiter="false" />

    <RouterView class="router-view"/>
</template>

