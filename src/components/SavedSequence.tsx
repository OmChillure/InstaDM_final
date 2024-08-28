import React from 'react'

export default function SavedSequences() {
    const sequences = [
      { name: 'Albert Flores', followUps: '2 follow ups', audience: 'Lorem ipsum' },
      { name: 'Jacob Jones', followUps: '3 follow ups', audience: 'Lorem ipsum' },
    ];
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Saved Sequences</h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3">Sequence</th>
                <th className="p-3">Number of Follow-ups</th>
                <th className="p-3">Related Audience</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {sequences.map((sequence, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-3">{sequence.name}</td>
                  <td className="p-3">{sequence.followUps}</td>
                  <td className="p-3">{sequence.audience}</td>
                  <td className="p-3 text-right">
                    <button className="text-gray-400 hover:text-white mr-2">Edit</button>
                    <button className="text-gray-400 hover:text-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  