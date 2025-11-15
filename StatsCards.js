/**
 * Stats Cards Component
 * Displays key metrics in card format
 */

import React from 'react';
import { MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const getEmojiForScore = (score) => {
    if (score > 0.3) return '😊';
    if (score < -0.3) return '😞';
    return '😐';
  };

  const cards = [
    {
      title: 'Total Mentions',
      value: stats.total,
      icon: MessageSquare,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Positive',
      value: stats.positive,
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      valueColor: 'text-green-600'
    },
    {
      title: 'Negative',
      value: stats.negative,
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      valueColor: 'text-red-600'
    },
    {
      title: 'Avg Sentiment',
      value: stats.avgSentimentScore.toFixed(2),
      emoji: getEmojiForScore(stats.avgSentimentScore),
      color: stats.avgSentimentScore > 0.3 ? 'green' : stats.avgSentimentScore < -0.3 ? 'red' : 'gray',
      bgColor: stats.avgSentimentScore > 0.3 ? 'bg-green-50' : stats.avgSentimentScore < -0.3 ? 'bg-red-50' : 'bg-gray-50',
      valueColor: stats.avgSentimentScore > 0.3 ? 'text-green-600' : stats.avgSentimentScore < -0.3 ? 'text-red-600' : 'text-gray-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <p className={`text-3xl font-bold ${card.valueColor || 'text-gray-900'}`}>
                {card.value}
              </p>
            </div>
            
            {card.icon ? (
              <card.icon className={`w-10 h-10 ${card.iconColor}`} />
            ) : (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgColor}`}>
                <span className="text-3xl">{card.emoji}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;