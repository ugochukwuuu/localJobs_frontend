window.onload = function() {
    // Your code here
    console.log("The browser has finished loading.");
    // sendTestEmail();
    // testBrevoService();
};
import brevoService from '@/services/brevoService';

const testBrevoService = async () => {
  const payload = {
    sender: {
      name: 'LocalJobs UNN',
      email: 'localjobsunn@gmail.com',
    },
    to: [
      {
        email: 'plastamasta21@gmail.com',
        name: 'Okeke Promise',
      },
    ],
    subject: 'Test Email',
    htmlContent: 'This is a test email from Brevo API.',
  };

  try {
    const response = await brevoService.sendEmail(payload);
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response || error);
  }
};

testBrevoService();