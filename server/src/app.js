import express from 'express';
import cors from 'cors';
import webhookRoutes from './routes/webhookRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/campaigns', campaignRoutes);
app.use('/api/webhooks', webhookRoutes);
export default app;
