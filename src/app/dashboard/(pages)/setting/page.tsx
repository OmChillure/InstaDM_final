import React from 'react'
import Image from 'next/image'

export default function ProfileSettings() {
  return (
    <div className="bg-gray-900 text-white min-h-screen ">
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Your Name</label>
                <input type="text" value="Sarah Thompson" className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-2">Country</label>
                <input type="text" value="USA" className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input type="email" value="sarah@gmail.com" className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input type="password" value="********" className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-2">Website</label>
                <input type="url" value="www.sarahsite.com" className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-2">Instagram Username</label>
                <input type="text" value="sarah_thompson" className="w-full bg-gray-700 rounded px-3 py-2" />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-24">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Manage Subscription
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Contact Us
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Download Chrome Extension
            </button>
          </div>
        </div>
      </div>
  )
}