/**
 * Main App Component
 * Orchestrates all components and manages application state
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import AlertsPanel from './components/AlertsPanel';
import Charts from './components/Charts';
import Filters from './components/Filters';
import MentionsList from './components/MentionsList';
import { useMonitoring } from './hooks/useMonitoring';

function App() {
  const {
    mentions,
    alerts,
    stats,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    dismissAlert
  } = useMonitoring();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [filteredMentions, setFilteredMentions] = useState([]);

  // Handle monitoring toggle
  const handleToggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };

  // Apply filters whenever mentions or filter criteria change
  useEffect(() => {
    let filtered = mentions;

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.text.toLowerCase().includes(search) ||
        m.topic.toLowerCase().includes(search) ||
        m.platform.toLowerCase().includes(search) ||
        m.author.toLowerCase().includes(search)
      );
    }

    // Apply sentiment filter
    if (selectedSentiment !== 'all') {
      filtered = filtered.filter(m => m.sentiment === selectedSentiment);
    }

    // Apply platform filter
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(m => m.platform === selectedPlatform);
    }

    setFilteredMentions(filtered);
  }, [mentions, searchTerm, selectedSentiment, selectedPlatform]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <Header 
        isMonitoring={isMonitoring}
        onToggleMonitoring={handleToggleMonitoring}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Alerts */}
        <AlertsPanel 
          alerts={alerts}
          onDismissAlert={dismissAlert}
        />

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Charts */}
        <Charts mentions={mentions} />

        {/* Filters */}
        <Filters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSentiment={selectedSentiment}
          onSentimentChange={setSelectedSentiment}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
        />

        {/* Mentions List */}
        <MentionsList 
          mentions={filteredMentions}
          isMonitoring={isMonitoring}
        />
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 mt-8 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <p>Brand Reputation Tracker v1.0</p>
          <p className="mt-1">Real-time monitoring powered by advanced sentiment analysis</p>
        </div>
      </footer>
    </div>
  );
}

export default App;