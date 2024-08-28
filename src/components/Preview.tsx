import React from 'react'

export default function Preview() {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Preview</h2>
          <select className="bg-gray-700 rounded px-3 py-1">
            <option>Templates</option>
          </select>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="mb-2">Initial Message</h3>
          <div className="bg-indigo-600 rounded-lg p-3 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 🚀
          </div>
          <p className="text-right text-sm text-gray-400">Today</p>
          
          <h3 className="mt-4 mb-2">Follow Up 01</h3>
          <div className="bg-indigo-600 rounded-lg p-3 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 🔥
          </div>
          <p className="text-right text-sm text-gray-400">After 3 days</p>
          
          <h3 className="mt-4 mb-2">Follow Up 02</h3>
          <div className="bg-indigo-600 rounded-lg p-3 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 💡
          </div>
          <p className="text-right text-sm text-gray-400">After 5 days</p>
        </div>
      </div>
    );
  }
