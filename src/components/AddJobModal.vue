<script setup>
import { reactive } from 'vue';
import store from "@/store/store";
import {supabase} from "@/config/supabase";


const jobData = reactive({
  title: "",
  description: "",
  salary: "",
  location: "",
  extraLocationDetails: "",
  category: "",
});

const toggleJobModal = () => {
    store.commit("setShowAddJob", true);
};
const handleJobPosting = (e) => {
    e.preventDefault();
    postJob(jobData);
    console.log(jobData);
    // toggleJobModal();
}
const postJob = async (jobData) =>{
    const { data, error } = await supabase
    .from('jobs')
    .insert([
        { title: jobData.title },
        { description: jobData.description },
        { salary: jobData.salary },
        { location: jobData.location },
        { extraLocationDetails: jobData.extraLocationDetails },
        { category: jobData.category },
        { recruiter_id: store.state.userId },
        { status: 'open' }
    ])
    .select()

    if (error) {
        console.log('Error posting job:', error.message);
    } else {
        console.log('Job posted:', data);
    }  
}

</script>

<template>
    <div class="add-job-modal d-flex">
    <form @submit = "handleJobPosting" class="modal-content d-flex flex-column justify-content-center">
        <div class="cancel d-flex align-items-center cursor">
            <i class="pi pi-asterisk" @click = "toggleJobModal"></i>
        </div>
        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Title</h3>
        <input v-model="jobData.title" type="text" placeholder="Job Title" />
        </div>

        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Description</h3>
        <input v-model="jobData.description" type="text" placeholder="Job Description" />
        </div>

        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Salary</h3>
        <input v-model="jobData.salary" type="text" placeholder="Job Salary" />
        </div>

        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Location</h3>
        <select v-model="jobData.location">
            <option value="Hilltop">Hilltop</option>
            <option value="Odenigwe">Odenigwe</option>
            <option value="Odim">Odim</option>
            <option value="Behind Flat">Behind Flat</option>
            <option value="Beach">Beach</option>
        </select>

        <input v-model="jobData.extraLocationDetails" type="text" placeholder = "put in additional location details"/>
        </div>

        <div class="row d-flex align-items-left justify-content-center">
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
        </div>

        <div class = "row d-flex align-items-left justify-content-center">
            <h3>Job Status</h3>
            <input type = 'text' placeholder = 'open' disabled/>
        </div>
    <button class="add-job cursor">Post Job</button>
    </form>
</div>
</template>

