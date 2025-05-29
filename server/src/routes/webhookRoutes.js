import express from 'express';
import { handleWebhook,getWebhookEvents } from '../controllers/webhookController.js';

const router = express.Router();

router.post('/webhook', handleWebhook);
router.get('/', getWebhookEvents);
export default router;
