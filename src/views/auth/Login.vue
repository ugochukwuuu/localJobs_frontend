<script setup>
// import '@/views/auth/auth.css'
import "@/assets/stylings/auth.css";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { createToastInterface, useToast } from "vue-toastification";
import { ref } from "vue";
import router from "@/Router/router";
import { supabase } from "@/config/supabase";
import load1 from "@/components/loader/load1.vue";


const isLoading = ref(false);
const toast = useToast();
const formData = reactive({
  email: "",
  password: "",
});
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const validate = () => {
  if (formData.email.length == 0) {
    toast.warning("put in a valid email");
    return false;
  }
  if (formData.password.length == 0) {
    toast.warning("put in a valid password");
    return false;
  }
  if (!passwordRegex.test(formData.password)) {
    toast.warning(
      "Your Password should have atleast one uppercase letter, one lowercase letter, one number and one special character"
    );
    return false;
  }
  return true;
};

const loginFunc = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  console.log(formData);

  loginUser(formData);
};

const loginUser = async () => {
  console.log("loggin in...");
  isLoading.value = true;

  let { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (authError) {
    toast.error( authError.message);
    console.log("Error loggin in", authError.message);
  isLoading.value = false;

  }

  const authToken = authUser.session.access_token;

  localStorage.setItem("authToken", authToken);
  localStorage.setItem("userId", authUser.user.id);
  // router.replace(`/${formData}/jobs/${authUser.user.id}`);

  await getUserDetails(authUser.user.id);
};

const getUserDetails = async (userId) => {
  let { data: user, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("Error getting user detaisl", error.message);
  }
  localStorage.setItem("userRole", user.role);

  console.log(user.role);
  console.log(userId);

  isLoading.value = false;


  router.replace(`/${user.role}/jobs/${userId}`).then(() => {
    location.reload();
  });
};

const passwordVisisble = ref(false);
const togglePassword = () => {
  passwordVisisble.value = !passwordVisisble.value;
};
</script>

<template>
  <body>
    <main>
      <load1 v-if="isLoading" />
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
              <input
                v-model="formData.email"
                type="email"
                placeholder="godzilladagoat@email.com"
              />
              <div class="password-div original-div d-flex align-items-center">
                <input
                  v-model="formData.password"
                  :type="passwordVisisble ? 'text' : 'password'"
                  placeholder="Password"
                  ref="password"
                />
                <i
                  :class="[
                    'eye-toggle',
                    passwordVisisble ? 'pi pi-eye' : 'pi pi-eye-slash',
                  ]"
                  @click="togglePassword"
                ></i>
              </div>
            </div>
            <button type="submit" class="create">Login</button>
          </form>
          <p class="login">
            Don't have an Account? <RouterLink to="/auth/register">Register</RouterLink>
          </p>
        </div>
      </div>
      <div class="right-div"></div>
    </main>
  </body>
</template>
