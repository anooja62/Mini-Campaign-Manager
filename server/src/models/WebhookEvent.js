import mongoose from 'mongoose';

const webhookEventSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'dropped', 'complained'],
    required: true,
  },
  eventTimestamp: {
    type: Date,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  metadata: {
    type: Object,
    default: {}, 
  },
}, {
  timestamps: true,
});

const WebhookEvent = mongoose.model('WebhookEvent', webhookEventSchema);
export default WebhookEvent;
