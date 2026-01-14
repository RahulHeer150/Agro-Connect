import React, { useState } from "react";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const submithandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-700 to-sky-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-8 shadow-green-800">
        <div className="flex mb-6 justify-center">
          <img src="" alt="" />
          Logo will placed here
        </div>
        <form onSubmit={submithandler}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={setEmail}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
          />
          <textarea
            type="text"
            placeholder="Enter your Feedback here"
            rows={5}
            cols={20}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
          />

          <button
            onClick={submithandler}
            className="w-full border-gray-100 rounded-lg mb-4 px-4 py-2 text-white font-semibold bg-green-700"
          >
            Submit your Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
