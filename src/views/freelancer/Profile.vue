<script setup>
     import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import {ref,onMounted} from 'vue';
    import apiConfig from '@/config/apiConfig';
    import axios from 'axios';
    import { jwtDecode } from "jwt-decode";

    localStorage.setItem('userRole',payload.user_role);
    const userRole = localStorage.userRole;
    
    const content = ref('');
    const isLoading = ref(true);
    onMounted(
        async ()=>{
            try{
                const response = await axios.get(`${apiConfig.baseUrl}${apiConfig.getAllUsers}`)
                setTimeout(()=>{
                    isLoading.value = false;
                    content.value = response.data;
                },3000)
            }
            catch(error){
                console.log(error)
            }
        }
    )
</script>

<template>
    <div v-if = 'isLoading'>
        <PulseLoader/>
    </div>
    <h1>{{content}}</h1>
</template>