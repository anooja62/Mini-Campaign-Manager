export default function CampaignList({ campaigns }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // Formats to DD/MM/YYYY
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
        <thead className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Type</th>
            <th className="text-left px-4 py-2">Start Date</th>
            <th className="text-left px-4 py-2">End Date</th>
            <th className="text-left px-4 py-2">Audience</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <tr
                key={campaign._id}
                className="border-t border-gray-100 hover:bg-orange-50 transition-colors"
              >
                <td className="px-4 py-2 font-medium text-gray-800">{campaign.name}</td>
                <td className="px-4 py-2 text-gray-700">{campaign.type}</td>
                <td className="px-4 py-2 text-gray-700">{formatDate(campaign.startDate)}</td>
                <td className="px-4 py-2 text-gray-700">{formatDate(campaign.endDate)}</td>
                <td className="px-4 py-2 text-gray-700">{campaign.audience}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
                No campaigns found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
