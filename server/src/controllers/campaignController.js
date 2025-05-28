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

  try {
    await sendCampaignEmail(to, subject, htmlContent);
    return res.status(200).json({ message: 'Email sent!' });
  } catch (err) {
    console.error('SendGrid error:', err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
};
