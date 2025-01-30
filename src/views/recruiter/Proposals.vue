<script setup>
    import { onMounted,reactive,ref,toRaw } from 'vue';
    import { useToast } from 'vue-toastification';
    import {supabase} from '@/config/supabase';
    import "@/assets/stylings/userRoles.css";
    import load1 from "@/components/loader/load1.vue";
    import brevoService from '@/services/brevoService'; 
    import store from "@/store/store";
    import { all } from 'axios';

 
        const toast = useToast();

        const showEmail = ref(false);
        const isGettingProposals = ref(false)
        const isSendingEmail = ref(false)


        const userId = store.state.userId;
        const allData = ref({})
        const selectedApplicantId = ref(null);
        const emailMessage = ref('');

        // function getTimeSinceCreation() {

        //     const createdDate = new Date(allData.applicants.createdAt);
        //     const now = new Date();


        //     const diffMs = now - createdDate;
                
        //     const days = Math.floor(diffMs / 86400000);
        //     const hours = Math.floor((diffMs % 86400000) / 3600000);

        //     const parts = [];
        //     if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        //     if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);


        //     createdAt.value = parts.join(', ');
        //     return parts.length > 0 ? parts.join(', ') : 'Just now';
        
        // }

            const openEmailModal = (applicantId) => {
                selectedApplicantId.value = applicantId; // Set the selected applicant ID
                showEmail.value = true; // Open the modal
            };

            const closeEmailModal = () => {
                selectedApplicantId.value = null; // Reset the selected applicant ID
                showEmail.value = false; // Close the modal
            };

             const sendEmail = async () => {
             isSendingEmail.value = true;
            const selectedApplicant = allData.value
                .flatMap(job => job.applicants)
                .find(applicant => applicant.id === selectedApplicantId.value);

            // Log the selected applicant and their details
            console.log('Selected Applicant:', selectedApplicant);
            console.log('Applicant Email:', selectedApplicant.applicant.email);
            console.log('Applicant Name:', selectedApplicant.applicant.name);

            // Validate the selected applicant
            if (!selectedApplicant || !selectedApplicant.applicant) {
                isSendingEmail.value = false;
                toast.error('Applicant not found or invalid data.');
                return;
            }

            
           const payload = {
                sender: {
                name: 'LocalJobs UNN',
                email: 'localjobsunn@gmail.com',
                },
                to: [
                {
                    email:  selectedApplicant.applicant.email,
                    name: selectedApplicant.applicant.name,
                },
                ],
                subject: 'Test Email',
                htmlContent: emailMessage.value,
            };

            try {
                const response = await brevoService.sendEmail(payload);
                isSendingEmail.value = false;
                console.log('Email sent successfully:', response.data);
                toast.success('Email sent successfully!');
                closeEmailModal();
            } catch (error) {
                            console.error('Error sending email:', error.response || error);
                            isSendingEmail.value = false;
                            console.error('Error sending email:', error);
                            toast.error('Failed to send email.');
            }
             }
        

        const getAllJobs = async ()=>{
            isGettingProposals.value = true;

            let {data:jobs, error} = await supabase
            .from('jobs')
            .select(`*,
            applicants:applications(*,
            applicant:users(*))`)
            .eq('recruiter_id',userId)

            if(error){
                console.error(error)
                isGettingProposals.value = false;

            }

            allData.value = jobs
            console.log(toRaw(allData.value))
            isGettingProposals.value = false;

        }

    onMounted(async ()=>{
        getAllJobs();
        console.log('working')
    })
</script>


<template>
    <div class="proposals">
        <load1 v-if="isGettingProposals" />
        <load1 v-if="isSendingEmail" />

        <div v-for="jobs in allData" :key="jobs.id" class="job-card">
            <div class="job-header">
                <h1>{{ jobs.title }}</h1>
                <p class="job-status" :class="jobs.status">{{ jobs.status }}</p>
            </div>
            <div class="applicants-list">
                <div class="applicant-card" v-for="(applicant, index) in jobs.applicants" :key="index">
                    <details>
                        <summary class="applicant-summary">
                            <div class="applicant-info">
                                <p class="applicant-name">{{ applicant.applicant.name }}</p>
                                <p class="applicant-status" :class="applicant.status">{{ applicant.status }}</p>
                            </div>
                        </summary>
                        <div class="applicant-details">
                            <p><strong>Email:</strong> {{ applicant.applicant.email }}</p>
                            <p><strong>Phone:</strong> {{ applicant.applicant.phone_no || "Not provided" }}</p>
                            <p><strong>Biography:</strong> {{ applicant.applicant.biography || "Not provided" }}</p>
                        </div>
                    </details>

                    <button 
                        class="accept-button" 
                        @click="openEmailModal(applicant.id)" 
                        v-if="!showEmail || selectedApplicantId !== applicant.id"
                    >
                        Accept
                        <i class="pi pi-thumbs-up"></i>
                    </button>

                    <div class="email-modal" v-if="showEmail && selectedApplicantId === applicant.id">
                        <div class="email-modal-content">
                            <h3>Send Email to {{ applicant.applicant.name }}</h3>
                            <textarea v-model="emailMessage" placeholder="Write your message here... 
                            Include how you'd like to communicate further with the freelancer
                            Remember LocalJobsUNN isn't responsible for the activities both you and the freelancer
                            do outside the platform 
                            "></textarea>
                            <div class="modal-buttons">
                                <button class="send-button d-flex align-items-center" @click="sendEmail">Send Email <i class="pi pi-send"></i></button>
                                <button class="cancel-button" @click="closeEmailModal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.proposals {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.job-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.job-header h1 {
    font-size: 24px;
    color: #333;
    margin: 0;
}

.job-status {
    font-size: 14px;
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 20px;
}

.job-status.open {
    background: #e3fcef;
    color: #0e9f6e;
}

.job-status.closed {
    background: #fde8e8;
    color: #c81e1e;
}

.applicants-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.applicant-card {
    background: #f9fafb;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.applicant-summary {
    list-style: none;
    cursor: pointer;
}

.applicant-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.applicant-name {
    font-size: 18px;
    color: #333;
    margin: 0;
}

.applicant-status {
    font-size: 14px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 20px;
}

.applicant-status.pending {
    background: #f0f4ff;
    color: #3b82f6;
}

.applicant-status.accepted {
    background: #e3fcef;
    color: #0e9f6e;
}

.applicant-status.rejected {
    background: #fde8e8;
    color: #c81e1e;
}

.applicant-details {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e5e7eb;
}

.applicant-details p {
    margin: 5px 0;
    color: #555;
}

.accept-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;

    display: inline-flex;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    color: #1f2937;
    

    
    background-color: #f3f4f6; 
    border: 2px dashed #9ca3af; 
    border-radius: 8px;
    
    transition: all 0.2s ease;
    cursor: pointer;
    gap: 3px;
    justify-content: flex-start;

    border: 1px solid rgba(0,0,0,0.05);
    padding: 0.5rem 1rem;
}

.accept-button:hover {
    background-color: #e5e7eb; 
    background: #81a9ff;
  transform: translateY(-1px);
}

.email-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.email-modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.email-modal-content h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 15px;
}

.email-modal-content textarea {
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin-bottom: 15px;
    resize: none;
}

.modal-buttons {
    display: flex;
    gap: 10px;
}

.send-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.send-button:hover {
    background: #2563eb;
}

.cancel-button {
    background: #f9fafb;
    color: #333;
    border: 1px solid #e5e7eb;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
}

.cancel-button:hover {
    background: #f3f4f6;
}
</style>