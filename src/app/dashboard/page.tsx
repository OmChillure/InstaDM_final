import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Messages Today', value: 0 },
    { label: 'Messages Total', value: 0 },
    { label: 'Replies Today', value: 0 },
    { label: 'Replies Total', value: 0 },
    { label: 'Active Campaigns', value: 0 },
    { label: 'Conversion Rate', value: '0%' },
  ];

  const charts = [
    { title: 'Message Activity', type: 'line' },
    { title: 'Reply Rate', type: 'bar' },
    { title: 'User Engagement', type: 'pie' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charts.map((chart, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{chart.title}</h3>
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">{chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart Placeholder</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Date</th>
              <th className="pb-2">Action</th>
              <th className="pb-2">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2" colSpan={3}>No recent activity</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
