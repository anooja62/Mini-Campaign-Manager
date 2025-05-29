import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WebhookEventTable() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({ campaignId: '', eventType: '', date: '' });

  const fetchEvents = async () => {
    try {
      const query = new URLSearchParams(filter).toString();
      const res = await axios.get(`http://localhost:8000/api/webhooks?${query}`);
      setEvents(res.data.events);
console.log('✌️res.data.events --->', res.data.events);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📨 Campaign Tracker</h2>
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  <input
    type="text"
    placeholder="Campaign Name / Type"
    value={filter.campaignName}
    onChange={(e) => setFilter({ ...filter, campaignName: e.target.value })}
    className="w-full sm:w-auto flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={filter.eventType}
    onChange={(e) => setFilter({ ...filter, eventType: e.target.value })}
    className="w-full sm:w-48 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">All Events</option>
    <option value="sent">Sent</option>
    <option value="delivered">Delivered</option>
    <option value="opened">Opened</option>
   
  </select>

  <input
    type="date"
    value={filter.date}
    onChange={(e) => setFilter({ ...filter, date: e.target.value })}
    className="w-full sm:w-48 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm border">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Metadata</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((e) => (
                <tr key={e._id} className="border-t">
                  <td className="px-4 py-2">{e.recipientEmail}</td>
                  <td className="px-4 py-2">{e.eventType}</td>
                  <td className="px-4 py-2">{new Date(e.eventTimestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">{JSON.stringify(e.metadata)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
