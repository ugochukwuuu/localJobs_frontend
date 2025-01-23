<script setup>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import {ref,onMounted} from 'vue';

    const content = ref('');
    const isLoading = ref(true);
    onMounted(
        async ()=>{
            setTimeout(()=>{
                isLoading.value = false;
                content.value = 'you currently have 0 proposal big boy'
            },3000)
        }
    )
</script>

<template>
    <div v-if = 'isLoading'>
        <PulseLoader/>
    </div>
    <h1>nice</h1>
</template>