"use client"
import React, { useState } from 'react';

const CreateList: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('RAW');
  const [listName, setListName] = useState<string>('');
  const [usernames, setUsernames] = useState<string>('');

  const options = ['CSV', 'RAW', 'JSON', 'FOLLOWERS', 'FOLLOWING', 'LIKES'];

  const handleCreate = () => {
    console.log('Creating list:', { listName, usernames, selectedOption });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create new list</h1>
      
      <div className="flex mb-4 border rounded-md">
        {options.map((option) => (
          <button
            key={option}
            className={`px-16 py-2 ${
              selectedOption === option
                ? 'bg-black text-white'
                : 'bg-white text-black'
            } `}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded-md mb-4"
        rows={5}
        placeholder="One username per line"
        value={usernames}
        onChange={(e) => setUsernames(e.target.value)}
      />

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-md"
          placeholder="List name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-r-md"
          onClick={handleCreate}
        >
          CREATE
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Lists</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Count</th>
              <th className="border p-2 text-left">Targets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2" colSpan={4}>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create your first list
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateList;