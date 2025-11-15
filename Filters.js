/**
 * Filters Component
 * Provides search and filtering controls
 */

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { platforms } from '../utils/dataGenerator';

const Filters = ({ 
  searchTerm, 
  onSearchChange,
  selectedSentiment,
  onSentimentChange,
  selectedPlatform,
  onPlatformChange
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-700">Filter Mentions</h3>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentions, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all text-sm"
            />
          </div>
        </div>
        
        {/* Sentiment Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedSentiment}
            onChange={(e) => onSentimentChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all text-sm bg-white cursor-pointer"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">✅ Positive Only</option>
            <option value="neutral">➖ Neutral Only</option>
            <option value="negative">❌ Negative Only</option>
          </select>
        </div>
        
        {/* Platform Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all text-sm bg-white cursor-pointer"
          >
            <option value="all">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(searchTerm || selectedSentiment !== 'all' || selectedPlatform !== 'all') && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            
            {selectedSentiment !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                Sentiment: {selectedSentiment}
              </span>
            )}
            
            {selectedPlatform !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                Platform: {selectedPlatform}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;