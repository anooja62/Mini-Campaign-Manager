import {
    differenceInDays,
    isBefore,
    isAfter,
    isWithinInterval,
    format,
  } from 'date-fns';
  import {
    CalendarDays,
    Clock,
    Signal,
    Tag,
  } from 'lucide-react'; // npm install lucide-react
  
  export default function CampaignSummary({ campaigns }) {
    const getStatus = (startDate, endDate) => {
      const now = new Date();
      if (isBefore(now, new Date(startDate))) return 'Upcoming';
      if (isAfter(now, new Date(endDate))) return 'Ended';
      if (isWithinInterval(now, { start: new Date(startDate), end: new Date(endDate) }))
        return 'Ongoing';
      return 'Unknown';
    };
  
    const getDaysRemaining = (endDate) => {
      const today = new Date();
      const end = new Date(endDate);
      const diff = differenceInDays(end, today);
      return diff > 0 ? `${diff} day(s)` : 'Ended';
    };
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-tr from-orange-100 to-yellow-50 border border-orange-200 transition-transform hover:scale-[1.02]"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-orange-700">{campaign.name}</h2>
              <div className="text-sm text-gray-600">
                {format(new Date(campaign.startDate), 'dd MMM yyyy')} –{' '}
                {format(new Date(campaign.endDate), 'dd MMM yyyy')}
              </div>
            </div>
  
            <div className="space-y-2 text-gray-800 text-sm">
              <p className="flex items-center gap-2">
                <Tag size={16} className="text-orange-500" />
                <strong>Type:</strong> {campaign.type}
              </p>
  
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                <strong>Status:</strong>{' '}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    getStatus(campaign.startDate, campaign.endDate) === 'Ongoing'
                      ? 'bg-green-100 text-green-700'
                      : getStatus(campaign.startDate, campaign.endDate) === 'Upcoming'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {getStatus(campaign.startDate, campaign.endDate)}
                </span>
              </p>
  
              <p className="flex items-center gap-2">
                <CalendarDays size={16} className="text-orange-500" />
                <strong>Days Remaining:</strong> {getDaysRemaining(campaign.endDate)}
              </p>
  
              <p className="flex items-center gap-2">
                <Signal size={16} className="text-orange-500" />
                <strong>Reach:</strong>{' '}
                {Math.floor(Math.random() * 1000 + 100)} users
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  