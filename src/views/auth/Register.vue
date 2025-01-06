<script setup>
    import '@/views/auth/auth.css'
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import { ref } from 'vue';
    import axios from 'axios';
    import apiConfig from '@/config/apiConfig'
    import router from '@/Router/router';

    const toast = useToast();

    const formData = reactive(
        {
            name: "",
            email: "",
            password: "",
        }
    )

    const password = ref('');
    const confirmPassword = ref('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    

    const validate = () => {
        if (formData.name === "" || formData.name == null) {
            toast.warning('First name is required');
            return false;
        }
        if (formData.email === "" || formData.email == null) {
            toast.warning('Email is required');
            return false;
        }
        if (formData.password === "" || formData.password == null) {
            toast.warning('Password is required');
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            toast.warning('Email is invalid');
            return false;
        }
        if (!passwordRegex.test(formData.password)) {
            toast.warning('Your Password should have atleast one uppercase letter, one lowercase letter, one number and one special character');
            return false;
        }
        if (password.value.value !== confirmPassword.value.value) {
            toast.warning('Passwords do not match');
            return false;
        }
        return true;
    }

    const registerFunc = async (e)=>{
        e.preventDefault();

        if(!validate()) return;

        console.log(formData)

        try{
            const response = await axios.post(`${apiConfig.baseUrl}${apiConfig.register}`, formData);
            const  data = response.data;
            console.log(data)
            toast.success(data.code)

            localStorage.setItem('authToken',data.token);
            localStorage.setItem('userId',data.id);
            console.log(localStorage)

            router.replace('/jobs')
        }
        catch(error){
            toast.error(error.response.data.message)
            console.log(error)
        }
    }
    const passwordVisisble = ref(false);
    const togglePassword = () =>{
        console.log('working')
        passwordVisisble.value = !passwordVisisble.value
    }
</script>

<template>
<body>
    <main class="signupPage">
        <div class="left-div">
            <div class="ld-wrapper">
                <h2>Create Your Account✨</h2>
                <form class="email-form" @submit="registerFunc">
                    <div class="line-text">
                        <span></span>
                        <p>or continue with email</p>
                        <span></span>
                    </div>
                    <div class="full-name-field">
                        <input v-model="formData.name" type="text" class="user-name" id="firstName" placeholder="John">
                    </div>
                    <div class="ef-input">
                    <input v-model="formData.email" type="email" placeholder="Email">
                    <div class="password-div original-div">
                        <input v-model="formData.password" :type = "passwordVisisble? 'text': 
                        'password' " placeholder="Password" ref = "password" >
                        <i :class="['eye-toggle', passwordVisisble?  'pi pi-eye': 'pi pi-eye-slash']" @click="togglePassword"></i>
                    </div>
                    <div class="password-div">
                        <input :type = "passwordVisisble? 'text': 'password' "
                         placeholder="Repeat Password" ref="confirmPassword">
                    </div>
                </div>

                    <button type="submit"  class="create" id="create-button">Create</button>
                </form>
                <p class="login">Already have an Account? <RouterLink to="/auth/login">Login</RouterLink></p>
            </div>
        </div>
        <div class="right-div">

        </div>
    </main>
</body>
  
</template>

