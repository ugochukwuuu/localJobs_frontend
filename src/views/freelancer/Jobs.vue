<script setup>
    import Job from '@/components/Job.vue';
    import { onMounted } from 'vue';


    
    onMounted(()=>{
      console.log('jobs')
    })
</script>

<template>
    <section class="">
        <h1>hello</h1>
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
