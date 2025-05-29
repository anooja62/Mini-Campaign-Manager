import cron from 'node-cron';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import EmailTemplate from '../models/EmailTemplate.js';
import { sendCampaignEmail } from '../services/sendgridService.js';

const sendCampaignEmails = async () => {
  const now = new Date();

  try {
    // Find active campaigns
    const campaigns = await Campaign.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: { $ne: 'completed' } // still ongoing
    });

    for (const campaign of campaigns) {
      const campaignDay =
        Math.floor((now - new Date(campaign.startDate)) / (1000 * 60 * 60 * 24)) + 1;

      // Get template for this day and campaign type
      const template = await EmailTemplate.findOne({
        category: campaign.type, // 'promotion', etc.
        day: campaignDay
      });

      if (!template) {
        console.log(`No template found for ${campaign.name} on day ${campaignDay}`);
        continue;
      }

      const users = await User.find({ category: campaign.audience });
      const emails = users.map(u => u.email);

      for (const email of emails) {
        await sendCampaignEmail(email, template.subject, template.body);
      }

      console.log(
        `✅ Sent Day ${campaignDay} campaign "${campaign.name}" to ${emails.length} users.`
      );
    

      // Optional: set completed if it's the last day
      if (now.toDateString() === new Date(campaign.endDate).toDateString()) {
        campaign.status = 'completed';
        await campaign.save();
      }
    }
  } catch (err) {
    console.error('❌ Error sending campaign emails:', err);
  }
};

 //Run every day at 9 AM
cron.schedule('0 9 * * *', () => {
  console.log('🚀 Running daily campaign cron at', new Date());
  sendCampaignEmails();
});



