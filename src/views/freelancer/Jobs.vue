<script setup>
    import Job from '@/components/Job.vue';
    import { onMounted,ref } from 'vue';
    import {supabase} from '@/config/supabase';
    import "@/assets/stylings/userRoles.css";
    import load1 from "@/components/loader/load1.vue";
    import JobCard from '@/components/JobCard.vue';  

    const isSearching = ref(false)
    const jobs = ref([])

    const handleSearch = async()=>{
    
        console.log("searching")
      }
      
      const getAllJob = async()=>{
        isSearching.value = true;
        
        let {data,error} = await supabase
        .from('jobs')
        .select('*')
        
        if(error){
          toast.error("Error getting jobs",error)
        }
        else{
          console.log(data)
          jobs.value = data;
          isSearching.value = false
        }
      }
      onMounted(()=>{
        console.log('jobs')
        getAllJob()

    })
</script>

<template>
    <main>

      <load1 v-if="isSearching"/>
        <div class="search-cont d-flex flex-column">
          <h1>Find your jobs easily</h1>
          <div class="search-bar-cont d-flex align-items-center">
            <div class="title-bar search-div">
              <i class="pi pi-search"></i>
              <input
                type="search"
                name=""
                id="" 
                class="search-bar"
                placeholder="Job title or keyword"
              />
            </div>
            <div class="location-bar search-div">
              <i class="pi pi-map-marker"></i>
              <input type="search" name="" id="" class="search-bar" placeholder="Location" />
            </div>
            <button @click="handleSearch" class="search-btn cursor">Search</button>
          </div>
        </div>

      <div class="card-container">
        <JobCard v-for="job in jobs" :job="job" :userRole = "'freelancer'"/>
      </div>
    </main>
       


</template>


<style scoped>
    h1 {
        font-size: 3rem;
    }
    .buttons button {
        margin-left: 10px;
        font-size: 1.5rem;
    }
    .counter {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
