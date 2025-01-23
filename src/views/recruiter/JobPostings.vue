<script setup>
import { onMounted, reactive } from "vue";
import { supabase } from "@/config/supabase";
import { ref } from "vue";

const postedJobs = ref([]);
const showAddJob = ref(false);
const userId = localStorage.getItem("userId");
const jobsDataLoading = ref(true);

const jobData = reactive({
  title: "",
  description: "",
  salary: "",
  location: "",
  category: "",
});

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
    showAddJob.value = true;
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
    <h1 class="raleway">Job Postings</h1>
    <p>You have posted {{ postedJobs.length }} jobs.</p>

    <div @click="addJobFunc" class="add-job-button d-flex align-items-center justify-content-center flex-column cursor">
    <i class="pi pi-plus"></i>
    <p>Add a job</p>
    </div>
<div v-if="showAddJob" class="add-job-modal d-flex">
    <form class="modal-content d-flex flex-column justify-content-center">
        <h3>Job Title</h3>
        <input v-model="jobData.title" type="text" placeholder="Job Title" />

        <h3>Job Description</h3>
        <input v-model="jobData.description" type="text" placeholder="Job Description" />

        <h3>Job Salary</h3>
        <input v-model="jobData.salary" type="text" placeholder="Job Salary" />

        <h3>Job Location</h3>
        <select v-model="jobData.location">
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Los Angeles">Los Angeles</option>
        </select>

        <h3>Category</h3>
        <select v-model="jobData.category">
        <option value="Household Services">Household Services</option>
        <option value="Delivery and Transport">Delivery and Transport</option>
        <option value="Administrative and Office Work">Administrative and Office Work</option>
        <option value="Creative and Media">Creative and Media</option>
        <option value="Technology and IT">Technology and IT</option>
        <option value="Education and Tutoring">Education and Tutoring</option>
        <option value="Health and Wellnes">Health and Wellness</option>
        <option value="Event Services">Event Services</option>
        <option value="Construction and Maintenance">Construction and Maintenance</option>
    </select>
    <button class="add-job cursor">Add Job</button>
    </form>
</div>
  </div>
</div>
</template>

<style scoped></style>
