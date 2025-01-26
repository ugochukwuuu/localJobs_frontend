<script setup>
import { onMounted, reactive } from "vue";
import { supabase } from "@/config/supabase";
import { ref } from "vue";

import JobCard from "@/components/JobCard.vue";

import AddJobModal from "@/components/AddJobModal.vue";
import "@/assets/stylings/userRoles.css";
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
    store.commit('setJobAction',"add");
    store.commit("setShowAddJob", true);
};

onMounted(() => {
  getAllJobs();
});
</script>
<template>
  <div class="main">
    <div
      v-if="jobsDataLoading"
      class="loader d-flex align-items-center justify-content-center"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </div>

    <div v-if="!jobsDataLoading" class="job-postings raleway">
      <div
        @click="addJobFunc"
        class="job-action-button add-job-btn align-items-center flex-row cursor"
      >
        <i class="pi pi-plus"></i>
        Add job
      </div>
      <h1 class="raleway">Job Postings</h1>
      <p>You have posted {{ postedJobs.length }} job(s).</p>

      <div class="card-container">
        <JobCard v-for="job in postedJobs" :key="job.id" :job="job" />
      </div>

      <AddJobModal v-if="store.state.showAddJob"/>
    </div>
  </div>
</template>

<style scoped></style>
