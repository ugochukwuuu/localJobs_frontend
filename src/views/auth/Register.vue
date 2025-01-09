<script setup>
    import "@/assets/stylings/auth.css"
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useToast } from 'vue-toastification';
    import { ref } from 'vue';
    import axios from 'axios';
    import apiConfig from '@/config/apiConfig'
    import router from '@/Router/router';
    import { jwtDecode } from "jwt-decode";
    const toast = useToast();

    const formData = reactive(
        {
            name: "",
            email: "",
            password: "",
            role: "",
        }
    )

    const password = ref('');
    const confirmPassword = ref('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    let userRole = ref('');

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
        if(formData.role == "" || formData.role == null){
            toast.warning('Please select your role')
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

            console.log(localStorage)
            
            if(data.token){
                const payload = jwtDecode(data.token);
                localStorage.setItem('authToken',data.token);
                localStorage.setItem('userRole',payload.user_role);

            }
            else{
                toast.error('authToken not sent by the server')
            }
            if(formData.role == freelancer){
                router.replace('/freelancer/complete-profile');
            }
            else{
                router.replace('/recruiter/complete-profile');
            }
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
    const updateRole = (e) =>{
        formData.role = e.target.id;
        userRole.value = e.target.id;
        console.log(userRole)
    }
</script>

<template>
<body>
    <main class="signupPage">
        <div class="left-div">
            <div class="ld-wrapper">
                <h2>Create Your Account✨</h2>
                <form class="email-form" @submit="registerFunc">
                    <div class="role-selection-div">
                        <div class="line-text">
                            <span></span>
                            <p>How do you want to use localJobs?</p>
                            <span></span>
                        </div>
                        <div class="role-selection-options option">
                            <button 
                            :class="['role', 
                            !userRole? 'normal': userRole === 'freelancer'? 'selected': 'normal']" 
                            type="button" 
                            id="freelancer"
                             @click="updateRole">Freelancer</button>
                            <button 
                            :class="['role',
                            
                            !userRole? 'normal': userRole !== 'freelancer'? 'selected': 'normal']" 
                            type="button" 
                            id="recruiter" 
                            @click="updateRole">Recruiter</button>    
                        </div>
                        <p class="role-description">
                        {{ !userRole ? ''
                            : userRole === 'freelancer'? 
                            `As a freelancer, you’ll browse and 
                            apply for local jobs that match your 
                            skills and interests`
                            : `As a recruiter, you’ll post 
                            job opportunities and connect with talented 
                            freelancers nearby.` }}
                        
                        </p>
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

