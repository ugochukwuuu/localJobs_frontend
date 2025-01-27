<script setup>
    import "@/assets/stylings/userRoles.css"
    import {supabase} from '@/config/supabase'
    import { createToastInterface, useToast } from "vue-toastification";

    import {defineProps} from 'vue';
    import {onMounted,ref} from 'vue';
    import AddJobModal from '@/components/AddJobModal.vue'
    import loadAnim from '@/components/loadAnim1.vue';
    import store from '@/store/store';

    const name = ref("promise")

    const userId = store.state.userId;

    const isDeleting = ref(false);
    const isApplying = ref(false)
    const toast = useToast();
    
    const props = defineProps({
        job: Object,
        userRole: {type: String, default: 'recruiter'},
    })

    const jobUpdate = ref(null)

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

    const editJobFunc = (job) => {
        // console.log(job)     
        store.commit('setJobAction',"edit");
        store.commit('setShowEditJob',true);

        store.commit('setEditingJob',job)
        console.log(store.state.editingJob)
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


        console.log(job)
    }

    const handleApplication = async(job,userId)=>{
        checkUser(job,userId);
    }

    const checkUser = async (job,userId) =>{
  
        let {data:applications,error} = await supabase
        .from('applications')
        .select('*')
        .eq("job_id", job.id)
        .eq("applicant_id", userId)
        .single()

        if (error){            
            applyJobFunc(job,userId)
        }
        else{
            toast.error("you've already applied to this job")
        }
    }

    const applyJobFunc = async (job,userId)=>{
        isApplying.value = true;
        let {data,error} = await supabase
        .from('applications')
        .insert([{
            "job_id": job.id,
            "applicant_id": userId,
            "status": "pending"
        }])
        .single()

        if(error){
            toast.error("There was an error applying for job", error)

        }
        else{
            toast.success("You have successfully applied for job")
            isApplying.value = false;
            console.log(data)

        }
    }

onMounted(()=>{
    getTimeSinceCreation();
})
</script>

<template>
    <div class="job-card d-flex flex-column">
        <loadAnim v-if= "isDeleting"/>
        <loadAnim v-if= "isApplying"/>
        <div class="recruiter-details d-flex flex-row">
            <p class = "job-description">{{job.recruiter.name}}</p>  
            <p class = "job-description">{{job.recruiter.email}}</p>  
        </div>

            <div class="c-row">
                <h1 class = "job-title">{{job.title}}</h1>  
                <p class = "job-description">{{job.description}}</p>  
            </div>
        <div class = "location-container d-flex flex-column ">
            <span class = "location tag">
                <i class="pi pi-map-marker"></i>
                {{job.location}}
                <p class = "location-details">{{job.extra_location_details}}</p>       
                </span>
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
            <div v-if="userRole == 'recruiter'"  @click="editJobFunc(job)" class="job-action-button edit-job-btn align-items-center flex-row cursor">
                <i class="pi pi-pencil"></i>
                <p>Edit Job</p>
            </div>
            <div v-if="userRole == 'recruiter'" @click="deleteJobFunc(job)" class="job-action-button delete-job-btn align-items-center  flex-row cursor">
                <i class="pi pi-trash"></i>
                <p>Delete Job</p>
            </div>
            <div v-if="userRole == 'freelancer'" @click="handleApplication(job,userId)" class="job-action-button apply-job-btn align-items-center  flex-row cursor">
                <i class="pi pi-briefcase"></i>
                <p>Apply for Job</p>
            </div>
    </div>

    <AddJobModal 
    v-if="store.state.showAddJob || store.state.showEditJob"
    :job = store.state.editingJob
    :name="name.value"
     />
    </div>
</template>