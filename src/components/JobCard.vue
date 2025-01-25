<script setup>
    import "@/assets/stylings/userRoles.css"
    import {supabase} from '@/config/supabase'
    import { createToastInterface, useToast } from "vue-toastification";

    import {defineProps} from 'vue';
    import {onMounted,ref} from 'vue';
    import AddJobModal from '@/components/AddJobModal.vue'
    import loadAnim from '@/components/loadAnim1.vue';


    const isDeleting = ref(false);
    const toast = useToast();
    
    const props = defineProps({
        job: Object
    })

    const createdAt = ref('');
    
    function getTimeSinceCreation() {

        const createdDate = new Date(props.job.created_at);
        const now = new Date();
        

        const diffMs = now - createdDate;
            
        const days = Math.floor(diffMs / 86400000);
        const hours = Math.floor((diffMs % 86400000) / 3600000);

        const parts = [];
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
       
        
        createdAt.value = parts.join(', ');
        return parts.length > 0 ? parts.join(', ') : 'Just now';
    }

    const editJobFunc = (d) => {
        console.log(d)
        if(confirm(`Are you sure you want to edit ${job.title}?`)){

        if(error){
            toast.error('Error editing Job',error)
        }
        else{
            console.log(data)
            toast.success('Job deleted successfully')
            location.reload();

            isDeleting.value = false;
        }
    }


    console.log(d)
}
    const deleteJobFunc = async (job) => {
        if(confirm(`Are you sure you want to delete ${job.title}?`)){

            isDeleting.value = true;
            const {data,error} = await supabase
            .from('jobs')
            .delete()
            .eq('id', job.id)

            if(error){
                toast.error('Error deleting Job',error)
            }
            else{
                console.log(data)
                toast.success('Job deleted successfully')
                location.reload();

                isDeleting.value = false;
            }
        }


        console.log(d)
    }


onMounted(()=>{
    getTimeSinceCreation();
})
</script>

<template>
    <div class="job-card d-flex flex-column">
        <loadAnim v-if= "isDeleting"/>
            <div class="c-row">
                <h1 class = "job-title">{{job.title}}</h1>  
                <p class = "job-description">{{job.description}}</p>  
            </div>
        
        <div class = "location-container d-flex flex-column ">
            <span class = "location tag">
                <i class="pi pi-map-marker"></i>
                {{job.location}}</span>
            <h1 class = "location-details">{{job.extra_location_details}}</h1>  
        </div>
        <div class = "tags d-flex ">
            <span class= "category tag">{{job.category}}</span>
            <span
            class = "tag"
            :class ="[job.status === 'open' ? 'open' : 'closed']"
            >{{job.status}}</span>
                
        </div>

        <div class="row last-row d-flex align-items-center justify-content-between">
            <h1 class = "salary">N{{job.salary}} <span>/hr</span></h1>  
            
            <h1 class = "time-posted d-flex flex-row align-items-center">
                <i class = "pi pi-clock time-posted"></i>    
            {{createdAt}}</h1>  
          
        </div>
        <div class="job-action-buttons">
        <div @click="editJobFunc(job)" class="job-action-button edit-job-btn align-items-center flex-row cursor">
        <i class="pi pi-pencil"></i>
        <p>Edit Job</p>
        </div>
        <div @click="deleteJobFunc(job)" class="job-action-button delete-job-btn align-items-center  flex-row cursor">
        <i class="pi pi-trash"></i>
        <p>Delete Job</p>
        </div>
    </div>
    </div>
</template>