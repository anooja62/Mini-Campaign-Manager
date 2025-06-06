import Campaign from '../models/Campaign.js';
import { sendCampaignEmail } from '../services/sendgridService.js';

export const createCampaign = async (req, res) => {
  try {
    const { name, startDate, endDate, audience, type } = req.body;

    if (!name || !startDate || !endDate || !audience || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCampaign = new Campaign({ name, startDate, endDate, audience, type });
    await newCampaign.save();

    return res.status(200).json({ message: 'Campaign created', id: newCampaign._id });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ startDate: -1 });
    return res.status(200).json({ campaigns });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const launchCampaignEmail = async (req, res) => {
  const { to, subject, htmlContent } = req.body;
  console.log('Email TO:', req.body.to);

  try {
    const recipients = Array.isArray(to) ? to : [to];
    
    for (const email of recipients) {
      await sendCampaignEmail(email, subject, htmlContent);
    }

    return res.status(200).json({ message: 'Emails sent!' });
  } catch (err) {
    console.error('SendGrid error:', err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
};


export const handleSendgridEvents = (req, res) => {
  const events = req.body; 

  events.forEach(event => {
    const { email, event: eventType, timestamp, sg_message_id } = event;

   
    console.log(`Email: ${email}, Event: ${eventType}, Time: ${timestamp}, Message ID: ${sg_message_id}`);

   
  });

  res.status(200).send('OK');
};

