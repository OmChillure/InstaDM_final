"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Initial Message Sent',
        data: [150, 180, 220, 190, 210, 240, 260],
        borderColor: 'rgba(147, 112, 219, 1)',
        tension: 0.4,
      },
      {
        label: 'Replies Received',
        data: [50, 70, 90, 60, 80, 100, 110],
        borderColor: 'rgba(138, 43, 226, 1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Campaign Overview</h2>
        <select className="bg-gray-800 p-2 rounded">
          <option>last 30 days</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gray-800 p-4 h-[44vh] rounded-lg">
          <Line data={chartData} options={chartOptions} />  
        </div>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-3xl font-bold">1253</div>
            <div className="text-sm text-gray-400">Initial Message Sent</div>
          </div>
          <div className="bg-purple-700 p-4 rounded-lg">
            <div className="text-3xl font-bold">226</div>
            <div className="text-sm">Replies Received</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">18%</div>
              <div className="text-sm text-gray-400">Response Rate</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">18%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          {['Audiences', 'Campaign', 'Sequences'].map((item, index) => (
            <div key={index} className="bg-purple-700 p-4 rounded-lg">
              <div className="text-sm mb-2">Total {item}</div>
              <div className="text-3xl font-bold">{index === 0 ? 170 : 2}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {['Create Audience', 'Create Sequence', 'Create Campaign'].map((action, index) => (
            <button key={index} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
              <span>{action}</span>
              <span className="text-xl">+</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;