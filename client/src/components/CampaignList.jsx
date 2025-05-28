// src/components/CampaignList.jsx
import React, { useState } from 'react';

function daysRemaining(endDate) {
  const diff = new Date(endDate) - new Date();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
}

export default function CampaignList({ campaigns }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch =
      camp.name.toLowerCase().includes(search.toLowerCase()) ||
      camp.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? camp.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Campaign Name or Type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by Status</option>
          <option value="Sent">Sent</option>
          <option value="Delivered">Delivered</option>
          <option value="Opened">Opened</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <p className="text-gray-500">No campaigns found.</p>
        ) : (
          filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{camp.name}</h2>
                <span className="text-sm font-medium text-gray-600">{camp.type}</span>
              </div>

              <p className="mb-1">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`font-semibold ${
                    camp.status === 'Sent'
                      ? 'text-green-600'
                      : camp.status === 'Delivered'
                      ? 'text-blue-600'
                      : 'text-purple-600'
                  }`}
                >
                  {camp.status}
                </span>
              </p>

              <p className="mb-1">
                <span className="font-medium">Emails Sent:</span> {camp.emailsSent}
              </p>

              <p className="mb-1">
                <span className="font-medium">Days Remaining:</span>{' '}
                {daysRemaining(camp.endDate)}
              </p>

              <p>
                <span className="font-medium">Performance Reach:</span> {camp.reach}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
