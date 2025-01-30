window.onload = function() {
    // Your code here
    console.log("The browser has finished loading.");
    // sendTestEmail();
    // console.log('Brevo API Key:', import.meta.env.VITE_BREVO_API_KEY);
    // testBrevoService();
};
{/* <div class="applicants-list">
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
    
    <button 
        class="reject-button" 
        @click="rejectApplic" 
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
</div> */}