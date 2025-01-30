// src/services/brevoService.js
import axios from 'axios';

const brevoClient = axios.create({
    baseURL: 'https://api.brevo.com/v3/smtp/email',
    headers: {
        'api-key': import.meta.env.VITE_BREVO_API_KEY, 
        'Content-Type': 'application/json',
    },
});

export default {
  sendEmail(payload) {
    return brevoClient.post('', payload);
  },
};