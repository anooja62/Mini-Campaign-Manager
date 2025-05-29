import WebhookEvent from '../models/WebhookEvent.js';

export const handleWebhook = async (req, res) => {
  try {
    const {
      campaignId,
      emailId,
      eventType,
      eventTimestamp,
      recipientEmail,
      metadata = {},
    } = req.body;

    if (!campaignId || !emailId || !eventType || !eventTimestamp || !recipientEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEvent = new WebhookEvent({
      campaignId,
      emailId,
      eventType,
      eventTimestamp: new Date(eventTimestamp),
      recipientEmail,
      metadata,
    });

    await newEvent.save();

    return res.status(201).json({
      message: '✅ Webhook event stored successfully',
      data: newEvent,
    });
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getWebhookEvents = async (req, res) => {
  try {
    const { campaignId, eventType, date } = req.query;
    const filter = {};

    if (campaignId) filter.campaignId = campaignId;
    if (eventType) filter.eventType = eventType;
    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      filter.eventTimestamp = { $gte: dayStart, $lte: dayEnd };
    }

    const events = await WebhookEvent.find(filter).sort({ eventTimestamp: -1 });
    res.json({ events });
  } catch (err) {
    console.error('Error fetching webhook events:', err);
    res.status(500).json({ error: 'Failed to fetch webhook events' });
  }
};
