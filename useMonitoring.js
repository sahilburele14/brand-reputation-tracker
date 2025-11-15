/**
 * Custom Hook: useMonitoring
 * Manages real-time brand mention monitoring
 */

import { useState, useEffect, useCallback } from 'react';
import { generateMention, generateInitialMentions } from '../utils/dataGenerator';
import { detectAllSpikes } from '../utils/spikeDetector';

export const useMonitoring = () => {
  const [mentions, setMentions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    avgSentimentScore: 0
  });

  /**
   * Calculate statistics from mentions
   */
  const calculateStats = useCallback((mentionsList) => {
    if (mentionsList.length === 0) {
      setStats({
        total: 0,
        positive: 0,
        negative: 0,
        neutral: 0,
        avgSentimentScore: 0
      });
      return;
    }

    const positive = mentionsList.filter(m => m.sentiment === 'positive').length;
    const negative = mentionsList.filter(m => m.sentiment === 'negative').length;
    const neutral = mentionsList.filter(m => m.sentiment === 'neutral').length;
    const avgScore = mentionsList.reduce((sum, m) => sum + m.sentimentScore, 0) / mentionsList.length;

    setStats({
      total: mentionsList.length,
      positive,
      negative,
      neutral,
      avgSentimentScore: avgScore
    });
  }, []);

  /**
   * Add new alert to the list
   */
  const addAlert = useCallback((alert) => {
    setAlerts(prev => {
      // Check if similar alert exists in last 30 seconds
      const recentSimilar = prev.find(
        a => a.type === alert.type && 
        (Date.now() - new Date(a.timestamp).getTime()) < 30000
      );
      
      if (recentSimilar) return prev; // Avoid duplicate alerts
      
      return [alert, ...prev].slice(0, 10); // Keep last 10 alerts
    });
  }, []);

  /**
   * Check for spikes and add alerts
   */
  const checkForSpikes = useCallback((mentionsList) => {
    const newAlerts = detectAllSpikes(mentionsList);
    newAlerts.forEach(alert => addAlert(alert));
  }, [addAlert]);

  /**
   * Initialize with some data
   */
  useEffect(() => {
    const initialMentions = generateInitialMentions(20);
    setMentions(initialMentions);
    calculateStats(initialMentions);
  }, [calculateStats]);

  /**
   * Real-time monitoring loop
   */
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const newMention = generateMention();
      
      setMentions(prev => {
        const updated = [newMention, ...prev].slice(0, 200); // Keep last 200
        calculateStats(updated);
        checkForSpikes(updated);
        return updated;
      });
    }, 2500); // Generate new mention every 2.5 seconds

    return () => clearInterval(interval);
  }, [isMonitoring, calculateStats, checkForSpikes]);

  /**
   * Start monitoring
   */
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    addAlert({
      id: `start-${Date.now()}`,
      type: 'info',
      message: 'Real-time monitoring started',
      timestamp: new Date(),
      severity: 'info'
    });
  }, [addAlert]);

  /**
   * Stop monitoring
   */
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    addAlert({
      id: `stop-${Date.now()}`,
      type: 'info',
      message: 'Real-time monitoring stopped',
      timestamp: new Date(),
      severity: 'info'
    });
  }, [addAlert]);

  /**
   * Clear all mentions
   */
  const clearMentions = useCallback(() => {
    setMentions([]);
    setStats({
      total: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      avgSentimentScore: 0
    });
  }, []);

  /**
   * Dismiss an alert
   */
  const dismissAlert = useCallback((alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  }, []);

  return {
    mentions,
    alerts,
    stats,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    clearMentions,
    dismissAlert
  };
};