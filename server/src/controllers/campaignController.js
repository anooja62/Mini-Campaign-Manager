import Campaign from '../models/Campaign.js';

export const createCampaign = async (req, res) => {
  console.log("inside create campaign")
  try {
    const { name, startDate, endDate, audience, type } = req.body;
console.log('✌️req.body --->', req.body);

   
    if (!name || !startDate || !endDate || !audience || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCampaign = new Campaign({ name, startDate, endDate, audience, type });
    await newCampaign.save();

    return res.status(200).json({ message: 'Campaign created', id: newCampaign._id });
  } catch (error) {
    return  res.status(500).json({ message: 'Server error', error });
  }
};
