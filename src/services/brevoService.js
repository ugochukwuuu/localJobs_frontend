// src/services/brevoService.js
import axios from 'axios';

const brevoClient = axios.create({
    baseURL: 'https://api.brevo.com/v3/smtp/email',
    headers: {
        'api-key': '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',
        'Content-Type': 'application/json',
    },
});

export default {
  sendEmail(payload) {
    return brevoClient.post('', payload);
  },
};