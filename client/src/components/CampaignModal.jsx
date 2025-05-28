import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

export default function CampaignModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    audience: '',
    type: '',
  });

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', startDate: '', endDate: '', audience: '', type: '' });
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Spring Sale"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={today}  // <-- disable past dates here
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={form.startDate || today}  // <-- endDate can't be before startDate
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <textarea
            name="audience"
            value={form.audience}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your target audience"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Social">Social</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 w-full text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Create Campaign
        </button>
      </form>
    </ModalWrapper>
  );
}
