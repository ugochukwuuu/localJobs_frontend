<script setup>
    import {ref,onMounted,toRaw} from 'vue';
    import store from "@/store/store";
    import {supabase} from '@/config/supabase';
    import load1 from "@/components/loader/load1.vue";

    const isGetting = ref(false)
    const appliedJobs = ref([]);
    const appliedJobsLength = ref(null);
    const userId = store.state.userId;
    const fetchAppliedJobs = async () => { 
        isGetting.value = true
        const { data, error } = await supabase
        .from('applications')
        .select(`*,
        job:jobs(*)`)
        .eq('applicant_id', userId);

       

    if (error) {
        console.error('Error fetching applied jobs:', error);
        isGetting.value = false;
        return;
    }

    console.log(data)
    appliedJobs.value = data;
    console.log(appliedJobs.value.length)
    appliedJobsLength.value = appliedJobs.value.length;
    isGetting.value = false;
};



    onMounted(
        async ()=>{
            fetchAppliedJobs();
        }
    )
</script>

<template>
    <load1 v-if="isGetting"/>
    <div class="proposals-container">
        <!-- Summary Section -->
        <div class="summary">
            <h1>My Proposals</h1>
            <p>You have applied to <strong>{{ appliedJobs.length }} jobs</strong>.</p>
        </div>

        <!-- Job List Section -->
        <div class="job-list">
            <div v-for="application in appliedJobs" :key="application.id" class="job-card">
                <h2>{{ application.job.title }}</h2>
                <p><strong>Status:</strong> {{ application.status }}</p>
                <p><strong>Applied At:</strong> {{ new Date(application.applied_at).toLocaleString() }}</p>

                <!-- Custom Messages -->
                <div v-if="application.status === 'accepted'" class="message accepted">
                    <p>Congratulations! You have been accepted. Check your email for more details.</p>
                </div>
                <div v-else-if="application.status === 'rejected'" class="message rejected">
                    <p>Unfortunately, your application was not successful this time. Keep applying!</p>
                </div>
                <div v-else class="message pending">
                    <p>Your application is under review. We'll notify you once a decision is made.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.proposals-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.summary {
    text-align: center;
    margin-bottom: 40px;
}

.summary h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.summary p {
    font-size: 1.2rem;
    color: #555;
}

.job-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.job-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.job-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.job-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
}

.job-card p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
}

.message {
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
}

.message.accepted {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.message.rejected {
    background-color: #ffebee;
    color: #c62828;
}

.message.pending {
    background-color: #fff3e0;
    color: #ef6c00;
}

/* Responsive Design */
@media (max-width: 768px) {
    .summary h1 {
        font-size: 2rem;
    }

    .summary p {
        font-size: 1rem;
    }

    .job-list {
        grid-template-columns: 1fr;
    }
}
</style>