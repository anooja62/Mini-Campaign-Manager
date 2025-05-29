// CampaignList.js
import axios from 'axios';

export default function CampaignList({ campaigns }) {
  const handleSend = async (campaign) => {
    try {
      // Sample content (can be customized per type)
      const htmlContent = `
        <h1>${campaign.name}</h1>
        <p>This is a ${campaign.type} campaign.</p>
      `;

      await axios.post('http://localhost:8000/api/campaigns/launch', {
        to: campaign.audience.split(','), // assuming audience is comma-separated emails
        subject: `${campaign.name} is Live!`,
        htmlContent,
      });

      alert('✅ Campaign email sent!');
    } catch (err) {
      console.error('Error sending campaign:', err);
      alert('❌ Failed to send campaign.');
    }
  };

  return (
    <div className="grid gap-4">
      {campaigns.map((campaign) => (
        <div key={campaign._id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{campaign.name}</h3>
          <p><strong>Type:</strong> {campaign.type}</p>
          <p><strong>Start:</strong> {campaign.startDate}</p>
          <p><strong>End:</strong> {campaign.endDate}</p>
          <p><strong>Audience:</strong> {campaign.audience}</p>
          <button
            onClick={() => handleSend(campaign)}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Send Campaign
          </button>
        </div>
      ))}
    </div>
  );
}
