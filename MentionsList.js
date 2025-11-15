/**
 * Mentions List Component
 * Displays list of brand mentions with details
 */

import React from 'react';
import { Download, MapPin, Users, Heart } from 'lucide-react';
import { getSentimentColor, getSentimentBadge } from '../utils/sentimentAnalyzer';

const MentionsList = ({ mentions, isMonitoring }) => {
  const exportToCSV = () => {
    if (mentions.length === 0) return;
    
    const headers = ['Timestamp', 'Platform', 'Sentiment', 'Score', 'Topic', 'Text', 'Author', 'Reach', 'Engagement'];
    const csvContent = [
      headers.join(','),
      ...mentions.map(m => [
        new Date(m.timestamp).toISOString(),
        m.platform,
        m.sentiment,
        m.sentimentScore,
        m.topic,
        `"${m.text.replace(/"/g, '""')}"`,
        m.author,
        m.reach,
        m.engagement
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-mentions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Mentions
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {mentions.length} {mentions.length === 1 ? 'mention' : 'mentions'} captured
          </p>
        </div>
        
        <button
          onClick={exportToCSV}
          disabled={mentions.length === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 
                   hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50
                   disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
      
      {/* Mentions List */}
      <div className="divide-y divide-gray-200 max-h-[700px] overflow-y-auto">
        {mentions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">
              {isMonitoring ? 'Listening for mentions...' : 'No mentions yet'}
            </p>
            <p className="text-gray-400 text-sm">
              {isMonitoring 
                ? 'New mentions will appear here as they are detected'
                : 'Click "Start Monitoring" to begin tracking brand mentions'
              }
            </p>
          </div>
        ) : (
          mentions.map(mention => (
            <div 
              key={mention.id} 
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Sentiment Indicator */}
                <div className={`w-1 h-full rounded-full ${getSentimentBadge(mention.sentiment)} flex-shrink-0`} />
                
                <div className="flex-1 min-w-0">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                      {mention.sentiment.toUpperCase()}
                    </span>
                    
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {mention.platform}
                    </span>
                    
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                      {mention.topic}
                    </span>
                    
                    <span className="ml-auto text-xs text-gray-500">
                      {new Date(mention.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {/* Mention Text */}
                  <p className="text-gray-900 mb-3 leading-relaxed">
                    {mention.text}
                  </p>
                  
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>@{mention.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>Reach: {mention.reach.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      <span>Engagement: {mention.engagement.toLocaleString()}</span>
                    </div>
                    
                    {mention.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{mention.location}</span>
                      </div>
                    )}
                    
                    <div className="ml-auto">
                      <span className={`font-medium ${
                        mention.sentimentScore > 0 ? 'text-green-600' : 
                        mention.sentimentScore < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        Score: {mention.sentimentScore.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentionsList;