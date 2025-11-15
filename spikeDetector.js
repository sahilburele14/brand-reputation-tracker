/**
 * Spike Detection Utility
 * Detects unusual patterns in mention volume and sentiment
 */

/**
 * Detect volume spike in mentions
 * @param {Array} mentions - Array of mention objects
 * @returns {Object|null} - Alert object or null
 */
export const detectVolumeSpike = (mentions) => {
  if (mentions.length < 20) return null;
  
  const recentMentions = mentions.slice(0, 10);
  const olderMentions = mentions.slice(10, 20);
  
  const recentRate = recentMentions.length / 10;
  const olderRate = olderMentions.length / 10;
  
  // Spike detected if recent rate is 2x older rate
  if (recentRate > olderRate * 2 && recentRate > 0.5) {
    const percentIncrease = Math.round((recentRate / olderRate - 1) * 100);
    
    return {
      id: `spike-${Date.now()}`,
      type: 'volume_spike',
      message: `Volume spike detected! Mention rate increased by ${percentIncrease}%`,
      timestamp: new Date(),
      severity: percentIncrease > 150 ? 'critical' : 'high',
      data: {
        recentRate,
        olderRate,
        percentIncrease
      }
    };
  }
  
  return null;
};

/**
 * Detect negative sentiment surge
 * @param {Array} mentions - Array of mention objects
 * @returns {Object|null} - Alert object or null
 */
export const detectNegativeSentimentSurge = (mentions) => {
  if (mentions.length < 10) return null;
  
  const recentMentions = mentions.slice(0, 10);
  const negativeCount = recentMentions.filter(m => m.sentiment === 'negative').length;
  const negativePercentage = (negativeCount / recentMentions.length) * 100;
  
  // Alert if more than 40% negative in recent mentions
  if (negativePercentage > 40) {
    return {
      id: `negative-${Date.now()}`,
      type: 'negative_sentiment',
      message: `High negative sentiment! ${negativeCount} negative mentions in last 10 (${Math.round(negativePercentage)}%)`,
      timestamp: new Date(),
      severity: negativePercentage > 60 ? 'critical' : 'high',
      data: {
        negativeCount,
        totalCount: recentMentions.length,
        percentage: negativePercentage
      }
    };
  }
  
  return null;
};

/**
 * Detect platform-specific spike
 * @param {Array} mentions - Array of mention objects
 * @returns {Object|null} - Alert object or null
 */
export const detectPlatformSpike = (mentions) => {
  if (mentions.length < 20) return null;
  
  const recentMentions = mentions.slice(0, 10);
  const platformCounts = {};
  
  recentMentions.forEach(mention => {
    platformCounts[mention.platform] = (platformCounts[mention.platform] || 0) + 1;
  });
  
  // Check if any platform has more than 50% of recent mentions
  for (const [platform, count] of Object.entries(platformCounts)) {
    const percentage = (count / recentMentions.length) * 100;
    if (percentage > 50 && count > 5) {
      return {
        id: `platform-${Date.now()}`,
        type: 'platform_spike',
        message: `${platform} spike detected! ${count} mentions (${Math.round(percentage)}% of recent activity)`,
        timestamp: new Date(),
        severity: 'medium',
        data: {
          platform,
          count,
          percentage
        }
      };
    }
  }
  
  return null;
};

/**
 * Detect topic trend
 * @param {Array} mentions - Array of mention objects
 * @returns {Object|null} - Alert object or null
 */
export const detectTopicTrend = (mentions) => {
  if (mentions.length < 15) return null;
  
  const recentMentions = mentions.slice(0, 15);
  const topicCounts = {};
  
  recentMentions.forEach(mention => {
    topicCounts[mention.topic] = (topicCounts[mention.topic] || 0) + 1;
  });
  
  // Find most discussed topic
  let maxTopic = null;
  let maxCount = 0;
  
  for (const [topic, count] of Object.entries(topicCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxTopic = topic;
    }
  }
  
  // Alert if a topic appears in more than 40% of recent mentions
  const percentage = (maxCount / recentMentions.length) * 100;
  if (percentage > 40 && maxCount > 6) {
    return {
      id: `topic-${Date.now()}`,
      type: 'topic_trend',
      message: `Trending topic: "${maxTopic}" - ${maxCount} mentions (${Math.round(percentage)}% of recent activity)`,
      timestamp: new Date(),
      severity: 'medium',
      data: {
        topic: maxTopic,
        count: maxCount,
        percentage
      }
    };
  }
  
  return null;
};

/**
 * Run all spike detection checks
 * @param {Array} mentions - Array of mention objects
 * @returns {Array} - Array of alert objects
 */
export const detectAllSpikes = (mentions) => {
  const alerts = [];
  
  const volumeAlert = detectVolumeSpike(mentions);
  if (volumeAlert) alerts.push(volumeAlert);
  
  const sentimentAlert = detectNegativeSentimentSurge(mentions);
  if (sentimentAlert) alerts.push(sentimentAlert);
  
  const platformAlert = detectPlatformSpike(mentions);
  if (platformAlert) alerts.push(platformAlert);
  
  const topicAlert = detectTopicTrend(mentions);
  if (topicAlert) alerts.push(topicAlert);
  
  return alerts;
};