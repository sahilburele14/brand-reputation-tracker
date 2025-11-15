/**
 * Charts Component
 * Displays data visualizations
 */

import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { platforms } from '../utils/dataGenerator';
import { topics } from '../utils/topicExtractor';

const Charts = ({ mentions }) => {
  // Sentiment distribution data
  const sentimentData = [
    {
      name: 'Positive',
      value: mentions.filter(m => m.sentiment === 'positive').length,
      color: '#10b981'
    },
    {
      name: 'Neutral',
      value: mentions.filter(m => m.sentiment === 'neutral').length,
      color: '#6b7280'
    },
    {
      name: 'Negative',
      value: mentions.filter(m => m.sentiment === 'negative').length,
      color: '#ef4444'
    }
  ];

  // Topic distribution data
  const topicData = topics.map(topic => ({
    name: topic,
    count: mentions.filter(m => m.topic === topic).length
  })).filter(t => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 7); // Top 7 topics

  // Platform distribution data
  const platformData = platforms.map(platform => ({
    name: platform,
    mentions: mentions.filter(m => m.platform === platform).length
  })).filter(p => p.mentions > 0)
    .sort((a, b) => b.mentions - a.mentions);

  // Sentiment timeline (last 30 mentions)
  const timelineData = mentions
    .slice(0, 30)
    .reverse()
    .map((m, i) => ({
      index: i + 1,
      sentiment: m.sentimentScore
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Sentiment Distribution Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sentiment Distribution
        </h3>
        {sentimentData.some(d => d.value > 0) ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => 
                  value > 0 ? `${name}: ${value} (${(percent * 100).toFixed(0)}%)` : ''
                }
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>

      {/* Topics Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Discussion Topics
        </h3>
        {topicData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 11 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>

      {/* Platform Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Platform Distribution
        </h3>
        {platformData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={platformData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={85}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="mentions" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>

      {/* Sentiment Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sentiment Timeline
        </h3>
        {timelineData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="index" 
                label={{ value: 'Recent Mentions', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[-1, 1]}
                ticks={[-1, -0.5, 0, 0.5, 1]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => [value.toFixed(2), 'Sentiment']}
              />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[280px] flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;