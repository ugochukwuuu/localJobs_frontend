<script>
    import { RouterLink } from 'vue-router';
    import "@/assets/stylings/sideBarNav.css"
    
</script>

<template>
   <div class="sidebar_nav">   
        <div class="sidebar_links d-flex flex-column">
            <RouterLink 
            to="/log-expenses" 
            class="button link d-flex align-items-center flex-row">
                <!-- <img src="../assets/icons/writingIcon.png" alt=""> -->
                Log expenses</RouterLink>
            <RouterLink 
            to = "/dashboard"
            class="button link d-flex align-items-center flex-row">
                <!-- <img src="../assets/icons/dashboardIcon.png" alt=""> -->
                Dashboard</RouterLink>
                
            <RouterLink
             to = "/profile"
              class="button link d-flex align-items-center flex-row">
                <!-- <img src="../assets/icons/profileIcon.png" alt=""> -->
                Profile</RouterLink>
            <RouterLink
            to = "/settings"
            class="button link d-flex align-items-center flex-row">
                <!-- <img src="../assets/icons/logoutIcon.png" alt=""> -->
                Logout</RouterLink>
        </div>

    </div>
</template>


<style scoped>

</style>