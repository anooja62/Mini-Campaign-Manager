import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  audience: { type: String, required: true },
  type: { type: String, enum: ['Email', 'SMS', 'Social'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
export default Campaign;
