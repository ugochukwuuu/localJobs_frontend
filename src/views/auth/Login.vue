<script setup>
    // import '@/views/auth/auth.css'
    import "@/assets/stylings/auth.css"
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import { createToastInterface, useToast } from 'vue-toastification';
    import { ref } from 'vue';
    import axios from 'axios';
    import apiConfig from '@/config/apiConfig';
    import router from '@/Router/router';   
    import { jwtDecode } from "jwt-decode";


    const toast = useToast();
    const formData = reactive( {
        email: "",
        password: ""
        }
    )
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const validate = () =>{
        if(formData.email.length == 0){
            toast.warning('put in a valid email')
            return false
        }
        if(formData.password.length == 0){
            toast.warning('put in a valid password')
            return false
        }
        if (!passwordRegex.test(formData.password)) {
            toast.warning('Your Password should have atleast one uppercase letter, one lowercase letter, one number and one special character');
            return false;
        }
        return true
    }

    const loginFunc = async (e)=>{
        e.preventDefault();

        if(!validate()) return;

        console.log(formData)
        router.replace('freelancer/jobs');

        // try{
        //     const response = await axios.post(`${apiConfig.baseUrl}${apiConfig.login}`, formData);
        //     const  data = response.data;
        //     console.log(localStorage)
            
        //     if(data.token){
        //         const payload = jwtDecode(data.token);
        //         localStorage.setItem('authToken',data.token);
        //         localStorage.setItem('userRole',payload.user_role);
                
        //         const userRole = localStorage.userRole;
        //         router.replace(`/${userRole}`);

        //     }
        //     else{
        //         toast.error('authToken not sent by the server')
        //     }
        //     toast.success(data.message)

        // }
        // catch(error){
        //     if (!error.response || !error.response.data || !error.response.data.message) {
        //     toast.error('An unknown error occurred');
        //     } else {
        //     toast.error(error.response.data.message);
        //     }
        // }
    }

    const passwordVisisble = ref(false);
    const togglePassword = () =>{
        passwordVisisble.value = !passwordVisisble.value
    }
</script>

<template>

<body>
    <main>
        <div class="left-div">
            <div class="ld-wrapper">
                <h2>Login to Your Account✨</h2>
                <form class="email-form" @submit="loginFunc">
                    <div class="line-text">
                        <span></span>
                        <p></p>
                        <span></span>
                    </div>
                    <div class="ef-input">
                    <input v-model="formData.email" type="email" placeholder="godzilladagoat@email.com">
                    <div class="password-div original-div">
                        <input v-model="formData.password" :type = "passwordVisisble? 'text': 
                        'password' " placeholder="Password" ref = "password" >
                        <i :class="['eye-toggle', passwordVisisble?  'pi pi-eye': 'pi pi-eye-slash']" @click="togglePassword"></i>
                    </div>
                    </div>
                    <button type="submit" class="create">Login</button>
                </form>
                <p class="login">Don't have an Account? <RouterLink to="/auth/register">Register</RouterLink></p>
            </div>
        </div>
        <div class="right-div">

        </div>
    </main>
</body>

</template>

