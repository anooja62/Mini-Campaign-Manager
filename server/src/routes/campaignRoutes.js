import express from 'express';
import { createCampaign,getAllCampaigns,launchCampaignEmail } from '../controllers/campaignController.js';

const router = express.Router();

router.post('/create', createCampaign);
router.get('/', getAllCampaigns);
router.post('/launch', launchCampaignEmail);
export default router;
