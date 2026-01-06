import React from 'react'

const Profile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm max-w-xl space-y-4">
        <input
          placeholder="Farmer Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          placeholder="Phone Number"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          placeholder="Farm Location"
          className="w-full border px-4 py-2 rounded"
        />
        <button className="bg-green-700 text-white px-6 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
