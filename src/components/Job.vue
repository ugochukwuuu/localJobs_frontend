<script setup>
    import { computed, ref, defineProps } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        job:Object,
    });

    const showFullDescription = ref(false);

    const toggleFullDescription = () =>{
      showFullDescription.value = !showFullDescription.value;
    }
    //we have to add the computed word to let vue know that the function should work based on the value of another function
    const truncatedDescription = computed(()=>{
      let description = props.job.description;

      if(!showFullDescription.value){
        //update the value of the description value that I want to pass on
        description = description.substring(0,90) + '...'
      }
        return description;
    })
</script>

<template>
    <div class="job-card">
        <h1>hello</h1>
    </div>
</template>

<style scoped>
  a{
    cursor:pointer;
  }
</style>

<script setup>

</script>
