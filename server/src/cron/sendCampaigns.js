import cron from 'node-cron';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import EmailTemplate from '../models/EmailTemplate.js';
import { sendCampaignEmail } from '../services/sendgridService.js';

const sendCampaignEmails = async () => {
  const now = new Date();

  try {
    // Find campaigns active now and not completed
    const campaigns = await Campaign.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: 'pending' // or your own field to track sending status
    });

    for (const campaign of campaigns) {
      const template = await EmailTemplate.findById(campaign.templateId);
      if (!template) {
        console.log(`Template not found for campaign ${campaign._id}`);
        continue;
      }

      const users = await User.find({ category: campaign.audience });
      const emails = users.map(u => u.email);

      for (const email of emails) {
        await sendCampaignEmail(email, template.subject, template.htmlContent);
      }

      // Mark campaign as completed or sent
      campaign.status = 'sent';
      await campaign.save();

      console.log(`Sent campaign emails for ${campaign.name} to ${emails.length} users.`);
    }
  } catch (err) {
    console.error('Error sending campaign emails:', err);
  }
};

// Schedule to run every hour (you can adjust cron expression)
cron.schedule('0 * * * *', () => {
  console.log('Running campaign email cron job at', new Date());
  sendCampaignEmails();
});
