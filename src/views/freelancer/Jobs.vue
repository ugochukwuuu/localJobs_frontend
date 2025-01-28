<script setup>
    import Job from '@/components/Job.vue';
    import { onMounted,reactive,ref } from 'vue';
    import {supabase} from '@/config/supabase';
    import "@/assets/stylings/userRoles.css";
    import load1 from "@/components/loader/load1.vue";
    import JobCard from '@/components/JobCard.vue';  
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const isSearching = ref(false)
    const jobs = ref([])

    const searchForm = reactive(
      {
        category: "All",
        location:"All"
       }
    )


    const handleSearch = async()=>{
        const location = searchForm.location.toLowerCase();
        const category = searchForm.category.toLowerCase();
        console.log('Search Parameters:',{location, category});
        location === "all" && category === "all" ? await getAllJob() : await getSpecific(location,category);

      }

      const getSpecific = async (location,category)=>{
        console.log("get specific")
        isSearching.value = true;

        let query = supabase
        .from('jobs')
        .select(`*,
          recruiter:users(id,name,email)
        `)
        
        if(location != 'all'){
          query = query.ilike('location',`%${location}%`)
        }

        if(category != 'all'){
          query = query.ilike('category',`%${category}%`)
        }


        let {data,error} = await query;

        
        if(error){
          toast.error("Error getting jobs",error)
          console.error(error)
          return;
        }

        else{
          if (data.length === 0) {
            toast.info('No jobs found matching your criteria');
            isSearching.value = false
          }
          isSearching.value = false;
        
          jobs.value = data;
          console.log(jobs.value)
        }
      }
      
      const getAllJob = async()=>{
        console.log("get all jobs")
        isSearching.value = true;
        
        let {data,error} = await supabase
        .from('jobs')
        .select(`*,
          recruiter:users(id,name,email)
        `)

        
        if(error){
          toast.error("Error getting jobs",error)
          console.error(error)
        }
        else{
          console.log(data)
          jobs.value = data;
          isSearching.value = false
        }
      }
      onMounted(()=>{
        getAllJob()

    })
</script>

<template>
    <main>

      <load1 v-if="isSearching"/>
        <div class="search-cont d-flex flex-row align-items-center">
          <h1>Find your jobs easily</h1>
          <div class="search-bar-cont d-flex align-items-center">
            <div class="location-bar search-div">
              <i class="pi pi-map-marker"></i>

              <select class="search-dropdown" v-model="searchForm.location">
                <option value="" disabled >Select the location</option>
                <option value="all">All</option>
                <option value="Hilltop">Hilltop</option>
                <option value="Odim">Odim</option>
                <option value="Odenigwe">Odenigwe</option>
                <option value="Behind Flat">Behind Flat</option>
                <option value="Beach">Beach</option>
              </select>
            </div>

            <div class="category-bar search-div">
              <i class="pi pi-briefcase"></i>
              <select class="search-dropdown" v-model="searchForm.category">
                    <option value="" disabled >Select your category</option>
                    <option value="Household Services">Household Services</option>
                    <option value="all">All</option>
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
