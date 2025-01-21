<script setup>
// import { ref } from 'vue';
// import store from '@/store/store';
    import Job from '@/components/Job.vue';
    // import { ref,defineProps, onMounted } from 'vue';
    // import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { RouterLink } from 'vue-router';


    // defineProps({
    //     limit: Number,
    //     showButton:{
    //         type: Boolean,
    //         default: true
    //     }
    // });


    const jobs = ref([]);
    // const jobsLoading = ref(true);
    const  fetchJobsData = async () =>  {
      try{
        const response = await fetch('http://127.0.0.1:8000/api/get-all-jobs');
        jobs.value = await response.json();
      }
      catch(errors){
        console.log(errors)
      }

    }
    
    onMounted(()=>{
      console.log(jobs)
      fetchJobsData();
    })
</script>

<template>
    <section class="">
        <Job v-for="job in jobs" :job = "job"/>
    </section>
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
