/**
 * Sentiment Analysis Utility
 * Analyzes text and returns sentiment classification and score
 */

const positiveWords = [
  'love', 'great', 'excellent', 'amazing', 'outstanding', 'best', 
  'recommend', 'impressive', 'wonderful', 'fantastic', 'awesome',
  'perfect', 'superb', 'brilliant', 'exceptional', 'incredible',
  'delighted', 'pleased', 'satisfied', 'happy', 'good'
];

const negativeWords = [
  'terrible', 'disappointed', 'bad', 'poor', 'worst', 'avoid',
  'broke', 'overpriced', 'awful', 'horrible', 'disgusting',
  'useless', 'waste', 'failed', 'frustrating', 'annoying',
  'unhappy', 'dissatisfied', 'angry', 'hate', 'never'
];

/**
 * Analyze sentiment of given text
 * @param {string} text - Text to analyze
 * @returns {Object} - { sentiment: string, score: number }
 */
export const analyzeSentiment = (text) => {
  if (!text || typeof text !== 'string') {
    return { sentiment: 'neutral', score: 0 };
  }

  let score = 0;
  const lowerText = text.toLowerCase();
  
  // Count positive words
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      score += matches.length;
    }
  });
  
  // Count negative words
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      score -= matches.length;
    }
  });
  
  // Normalize score to range [-1, 1]
  const normalizedScore = Math.max(-1, Math.min(1, score / 3));
  
  // Classify sentiment
  let sentiment;
  if (normalizedScore > 0.2) {
    sentiment = 'positive';
  } else if (normalizedScore < -0.2) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  return {
    sentiment,
    score: normalizedScore
  };
};

/**
 * Get sentiment color class for UI
 * @param {string} sentiment - Sentiment type
 * @returns {string} - Tailwind CSS classes
 */
export const getSentimentColor = (sentiment) => {
  switch(sentiment) {
    case 'positive':
      return 'text-green-600 bg-green-50';
    case 'negative':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

/**
 * Get sentiment badge color
 * @param {string} sentiment - Sentiment type
 * @returns {string} - Tailwind CSS classes
 */
export const getSentimentBadge = (sentiment) => {
  const colors = {
    positive: 'bg-green-500',
    negative: 'bg-red-500',
    neutral: 'bg-gray-500'
  };
  return colors[sentiment] || 'bg-gray-500';
};