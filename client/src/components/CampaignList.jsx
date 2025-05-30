import { useState } from 'react';

export default function CampaignList({ campaigns }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCampaigns = campaigns.slice(startIdx, startIdx + itemsPerPage);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
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
            {currentCampaigns.length > 0 ? (
              currentCampaigns.map((campaign) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
