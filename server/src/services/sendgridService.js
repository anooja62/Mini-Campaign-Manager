import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendCampaignEmail = async (to, subject, htmlContent) => {
  const msg = {
    to,
    from: 'anoojam141@gmail.com', 
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error.message);
    throw error;
  }
};
