import { useEffect, useState } from "react";
import CampaignModal from "../components/CampaignModal";
import axiosInstance from "../utils/axiosInstance";
import CampaignList from "../components/CampaignList";
import { Plus } from "lucide-react";

import WebhookEventTable from "../components/WebhookEventTable";
import CampaignSummary from "../components/CampaignSummary";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosInstance.get("/campaigns/");
      setCampaigns(res.data.campaigns);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (formData) => {
    if (new Date(formData.startDate) < new Date()) {
      alert("Start date cannot be in the past.");
      return;
    }

    try {
      const res = await axiosInstance.post("/campaigns/create", formData);
      alert("✅ Campaign created successfully!");
      console.log("ress", res.data);
      await fetchCampaigns();
      setIsModalOpen(false);
    } catch (err) {
      if (err.response) {
        alert(`Error: ${err.response.data.message || err.response.data.error}`);
      } else {
        alert("Failed to create campaign. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
  

      <div className="relative p-6 min-h-screen">
        <div
          className="fixed inset-0 -z-10 flex justify-center items-center"
          aria-hidden="true"
        >
          <img
            src="/images/background.jpg"
            alt="Background"
            className="w-auto h-auto opacity-10 object-contain"
          />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2 mb-6">
              <h1 className="text-4xl font-extrabold text-black">
                📊 Campaign Command Center
              </h1>
              <p className="text-sm text-gray-600 font-light">
                All-in-one dashboard to launch, track & optimize your marketing
                campaigns.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2.5 rounded-full shadow-md hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 font-semibold"
            >
              <Plus className="w-5 h-5" />
              New Campaign
            </button>
          </div>

          <div className="rounded-xl shadow p-4 border border-gray-200">
            <CampaignList campaigns={campaigns} />
          </div>
      
          <div className="mt-10">
          <WebhookEventTable />
          </div>
          <div className="mt-10">
          <CampaignSummary campaigns={campaigns} />
          </div>
        </div>

        {/* Modal */}
        <CampaignModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateCampaign}
        />
      </div>
    </div>
  );
}
