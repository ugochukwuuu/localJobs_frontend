<script setup>
import { onMounted, reactive } from "vue";
import { supabase } from "@/config/supabase";
import { ref } from "vue";

import JobCard from "@/components/JobCard.vue";

import AddJobModal from "@/components/AddJobModal.vue";
import "@/assets/stylings/userRoles.css"
import store from "@/store/store";
const postedJobs = ref([]);
const userId = localStorage.getItem("userId");

const jobsDataLoading = ref(true);


const getAllJobs = async () => {
  let { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("recruiter_id", userId);

  if (error) {
    console.log("Error getting jobs", error.message);
  }
  console.log(jobs);
  postedJobs.value = jobs;
  jobsDataLoading.value = false;
};

const addJobFunc = () => {
    store.commit("setShowAddJob", true);
};

onMounted(() => {
  getAllJobs();
});
</script>
<template>  
<div class="main">
    <div v-if="jobsDataLoading" class="loader d-flex align-items-center justify-content-center">
        <i class="pi pi-spin pi-spinner"></i>
    </div>

  <div v-if="!jobsDataLoading" class="job-postings raleway">
    <div class="job-action-buttons">
        <div @click="addJobFunc" class="job-action-button add-job-btn align-items-center  flex-row cursor ">
        <i class="pi pi-plus"></i>
        <p>Add a job</p>
        </div>
        <div @click="" class="job-action-button edit-job-btn  align-items-center  flex-row cursor">
        <i class="pi pi-pencil"></i>
        <p>Edit Job</p>
        </div>
        <div @click="" class="job-action-button delete-job-btn align-items-center  flex-row cursor">
        <i class="pi pi-trash"></i>
        <p>Delete Job</p>
        </div>
    </div>
    <h1 class="raleway">Job Postings</h1>
    <p>You have posted {{ postedJobs.length }} jobs.</p>


    <div class = "card-container">
        <JobCard v-for="job in postedJobs" :ket="job.id" :job = "job"/>
    </div>

 
    
    <AddJobModal v-if="store.state.showAddJob"/>
  </div>
</div>
</template>

<style scoped></style>
