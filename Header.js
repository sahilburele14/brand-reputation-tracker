/**
 * Header Component
 * Displays app title and monitoring controls
 */

import React from 'react';
import { Eye } from 'lucide-react';

const Header = ({ isMonitoring, onToggleMonitoring }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Brand Reputation Tracker
              </h1>
              <p className="text-sm text-gray-500">
                Real-time mention monitoring & sentiment analysis
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">
                {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
              </span>
            </div>
            
            <button
              onClick={onToggleMonitoring}
              className={`px-6 py-2 rounded-lg font-medium transition-all shadow-sm ${
                isMonitoring 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;