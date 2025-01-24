<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { supabase } from "./config/supabase";
import store from '@/store/store'

onMounted(() => {
  // getUsers();
  // console.log('userId:',store.state.userId)
  store.commit('setUserId',localStorage.getItem('userId'));


});

const getUsers = async () => {
  // console.log(import.meta.env.VITE_SUPABASE_URL)
  // console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)

  let { data: user, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", "aed3c08d-a18a-4ef3-8458-ae2aa16a87d6")
    .single();

  if (error) {
    console.log("error", error);
  } else {
    console.log("users", user);
  }
};
</script>

<template>
  <RouterView />
</template>
