<script setup>


import { reactive } from 'vue';
import store from "@/store/store";
import {supabase} from "@/config/supabase";
import { createToastInterface, useToast } from "vue-toastification";
import load1 from "@/components/loader/load1.vue";
import {ref} from 'vue';
const isLoading = ref(false);
import {defineProps} from 'vue';

const toast = useToast();

//get passable props that wnhen loaded yuo'll pass into jobData and fill the form



const props = defineProps({
    job:{
        type: Object,
        default: {
            title: "",
            description: "",
            salary: "",
            location: "",
            extraLocationDetails: "",
            category: "",
        }
    },
    name:{
        type: String,
        default: "default"
    }
})
const jobData = reactive({
  title: "",
  description: "",
  salary: "",
  location: "",
  extraLocationDetails: "",
  category: "",
});


const validate = () => {
  if (jobData.title.length == 0) {
    toast.warning("put in a valid title");
    return false;
  }
  if (jobData.description.length == 0) {
    toast.warning("put in a descripition");
    return false;
  }
  if (jobData.salary.length == 0) {
    toast.warning("put in a salary");
    return false;
  }
  if (jobData.category.length == 0) {
    toast.warning("put in a category");
    return false;
  }
  if (jobData.location.length == 0) {
    toast.warning("put in a location");
    return false;
  }
  if (jobData.extraLocationDetails.length == 0) {
    toast.warning("put in additional information about the location");
    return false;
  }
  return true;
};
const handleJobPosting = (e) => {
    e.preventDefault();
    if (!validate()) return;
    postJob(jobData);
    console.log(jobData);

}

const handleJobEditing = (e) => {
    e.preventDefault();
    
    console.log(props.name)
    console.log(store.state.editingJob.id);
}

const handleFormSubmit = (e) =>{
    e.preventDefault();

    if(store.state.jobAction == 'add'){
        handleJobPosting(e);
    }
    else{
        handleJobEditing(e);
    }
}
const handleModalDisplay = ()=>{
    if(store.state.jobAction == 'add'){
        store.commit("setShowAddJob", false);
    }
    else{
        store.commit("setShowEditJob", false);
    }
}

const postJob = async (jobData) =>{
  isLoading.value = true;
  store.commit("setJobPostingLoading", true);
    const { data, error } = await supabase
    .from('jobs')
    .insert([
        { title: jobData.title,
         description: jobData.description,
         salary: jobData.salary,
         location: jobData.location,
         extra_location_details: jobData.extraLocationDetails,
         category: jobData.category,
         recruiter_id: store.state.userId,
         status: 'open' }
    ])
    .select()

    if (error) {
        console.log('Error posting job:', error.message);
        toast.error('Error posting job:', error.message);
        store.commit("setJobPostingLoading", false);
    } else {
        console.log('Job posted:', data);
        location.reload();
        setTimeout(() => {
            store.commit("setShowAddJob", false);
        }, 1500);
    }  
}

</script>

<template>
    <div class="add-job-modal d-flex">
        <form  @submit="handleFormSubmit" class="modal-content d-flex flex-column justify-content-center">
            <load1 v-if="store.state.jobPostingLoading" />
        <div class="cancel d-flex align-items-center cursor">
            <i class="pi pi-asterisk" @click = "handleModalDisplay"></i>
        </div>
        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Title</h3>
        <input v-model="jobData.title" value = {store.state.editingJob.id} type="text" placeholder="Job Title" />
        </div>

        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Description</h3>
        <input v-model="jobData.description" type="text" placeholder="Job Description" />
        </div>

        <div class="row d-flex align-items-left justify-content-center">
        <h3>Job Salary</h3>
        <input v-model="jobData.salary" type="number" placeholder="Job Salary" />
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
    <button class="add-job cursor">
    {{store.state.jobAction == 'add' ? 'Add Job' : 'Edit Job'}}    
    </button>
    </form>
</div>
</template>

