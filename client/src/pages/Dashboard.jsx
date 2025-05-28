import { useState } from 'react';
import CampaignModal from '../components/CampaignModal';
import axios from 'axios';
export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCampaign = async (formData) => {

    try {
      const res = await axios.post('http://localhost:8000/api/campaigns/create', formData);
console.log('✌️res --->', res);
  
      console.log('Campaign created:', res.data.campaign);
      // Optional: refresh campaigns list, show success toast, etc.
    } catch (err) {
      if (err.response) {
        // Server responded with an error status
        console.error('Error creating campaign:', err.response.data.error);
        alert(`Error: ${err.response.data.error}`);
      } else if (err.request) {
        // Request was made but no response received
        console.error('No response:', err.request);
        alert('No response from server.');
      } else {
        // Something else went wrong
        console.error('Error:', err.message);
        alert('Failed to create campaign. Please try again.');
      }
    }
  };
  

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + New Campaign
        </button>
      </div>

      {/* Modal Component */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
}
