import { useState, useMemo } from "react";

export default function CampaignTracker({ campaigns }) {
  const [statusFilter, setStatusFilter] = useState("All"); // Sent, Delivered, Opened, All
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

  // Filtered campaigns by search (name or type)
  const filteredCampaigns = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return campaigns
      .filter((campaign) =>
        campaign.name.toLowerCase().includes(term) ||
        campaign.type.toLowerCase().includes(term)
      )
      .map((campaign) => ({
        ...campaign,
        // Filter emails by date >= today and status filter
        emails: campaign.emails.filter((email) => {
          const isDateValid = email.date >= today;
          const isStatusValid = statusFilter === "All" || email.status === statusFilter;
          return isDateValid && isStatusValid;
        }),
      }))
      // Remove campaigns with no emails after filtering
      .filter((campaign) => campaign.emails.length > 0);
  }, [campaigns, searchTerm, statusFilter, today]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Campaign Tracker</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Campaign Name or Type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Sent">Sent</option>
          <option value="Delivered">Delivered</option>
          <option value="Opened">Opened</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded shadow-sm">
          <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <tr>
              <th className="text-left px-4 py-2">Campaign Name</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">Recipient</th>
              <th className="text-left px-4 py-2">Email Status</th>
              <th className="text-left px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No matching emails found.
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((campaign) =>
                campaign.emails.map((email) => (
                  <tr
                    key={email.id}
                    className="border-t border-gray-100 hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium text-gray-800">{campaign.name}</td>
                    <td className="px-4 py-2 text-gray-700">{campaign.type}</td>
                    <td className="px-4 py-2 text-gray-700">{email.recipient}</td>
                    <td className="px-4 py-2 text-gray-700">{email.status}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {new Date(email.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
