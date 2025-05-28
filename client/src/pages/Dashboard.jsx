import { useEffect, useState } from 'react';
import CampaignModal from '../components/CampaignModal';
import axios from 'axios';
import CampaignList from '../components/CampaignList';
export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/campaigns');
console.log('✌️res --->', res.data);
      setCampaigns(res.data.campaigns);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
  };
  useEffect(() => {
    fetchCampaigns();
  }, []);
  const handleCreateCampaign = async (formData) => {
    if (new Date(formData.startDate) < new Date()) {
      alert('Start date cannot be in the past.');
      return;
    }
    
    try {
      const res = await axios.post('http://localhost:8000/api/campaigns/create', formData);
  
      alert('✅ Campaign created successfully!');
      console.log('Campaign created:', res.data.campaign);
      // Optional: refresh campaigns list, reset form, etc.
    } catch (err) {
      if (err.response) {
        console.error('Error creating campaign:', err.response.data.message || err.response.data.error);
        alert(`Error: ${err.response.data.message || err.response.data.error}`);
      } else if (err.request) {
        console.error('No response:', err.request);
        alert('No response from server.');
      } else {
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
       <CampaignList campaigns={campaigns} />
    </div>
  );
}
