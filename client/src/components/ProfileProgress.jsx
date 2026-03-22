import React from "react";
import { motion } from "framer-motion";

const ProfileProgress = ({ percentage }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300">
          Profile Completion
        </span>
        <span className="text-sm font-semibold text-green-400">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          className="h-3 bg-gradient-to-r from-green-400 to-green-600"
        />
      </div>

      {percentage < 100 && (
        <p className="text-xs text-yellow-400 mt-2">
          Complete your profile to unlock full features.
        </p>
      )}
    </div>
  );
};

export default ProfileProgress;