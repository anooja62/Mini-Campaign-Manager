import express from 'express';
import { createCampaign,getAllCampaigns,launchCampaignEmail,handleSendgridEvents } from '../controllers/campaignController.js';

const router = express.Router();

router.post('/create', createCampaign);
router.get('/', getAllCampaigns);
router.post('/launch', launchCampaignEmail);
router.post('/events', handleSendgridEvents);

export default router;
