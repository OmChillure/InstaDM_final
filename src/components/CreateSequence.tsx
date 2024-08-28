import React from "react";

export default function CreateSequence() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Enter sequence name"
          className="bg-gray-700 rounded px-3 py-2 flex-grow mr-4"
        />
        <select className="bg-gray-700 rounded px-3 py-2 mr-4">
          <option>2 follow up</option>
        </select>
        <button className="bg-indigo-600 rounded px-4 py-2">
          Create New Sequence
        </button>
      </div>
      <div className="mb-4">
        <h3 className="mb-2">Initial Message</h3>
        <textarea
          placeholder="Type your message..."
          className="bg-gray-700 rounded p-2 w-full h-24"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2">First Follow-up</h3>
          <select className="bg-gray-700 rounded px-3 py-2 mb-2 w-full">
            <option>Timing</option>
          </select>
          <textarea
            placeholder="Type your follow-up message..."
            className="bg-gray-700 rounded p-2 w-full h-24"
          ></textarea>
        </div>
        <div>
          <h3 className="mb-2">Second Follow-up</h3>
          <select className="bg-gray-700 rounded px-3 py-2 mb-2 w-full">
            <option>Timing</option>
          </select>
          <textarea
            placeholder="Type your follow-up message..."
            className="bg-gray-700 rounded p-2 w-full h-24"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
