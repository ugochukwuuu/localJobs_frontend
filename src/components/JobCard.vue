<script setup>
    import "@/assets/stylings/userRoles.css"


    import {defineProps} from 'vue';
    import {onMounted,ref} from 'vue';
    
    const props = defineProps({
        job: Object
    })

    const createdAt = ref('');
    
    function getTimeSinceCreation() {
        // Parse the Supabase timestamp and current time
        const createdDate = new Date(props.job.created_at);
        const now = new Date();
        
        // Calculate difference in milliseconds
        const diffMs = now - createdDate;
        
        // Calculate time units
        const days = Math.floor(diffMs / 86400000);
        const hours = Math.floor((diffMs % 86400000) / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);

        // Build human-readable string
        const parts = [];
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
        // if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
        // if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
        
        createdAt.value = parts.join(', ');
        return parts.length > 0 ? parts.join(', ') : 'Just now';
    }

onMounted(()=>{
    getTimeSinceCreation();
})
</script>

<template>
    <div class="job-card d-flex flex-column">
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
    </div>
</template>