/**
 * Topic Extraction Utility
 * Extracts main topic/theme from text using keyword matching
 */

export const topics = [
  'Product Quality',
  'Customer Service',
  'Pricing',
  'Features',
  'Brand Image',
  'Competition',
  'Innovation'
];

const topicKeywords = {
  'Product Quality': [
    'quality', 'product', 'build', 'made', 'durable', 'materials',
    'craftsmanship', 'workmanship', 'defect', 'broken', 'working'
  ],
  'Customer Service': [
    'service', 'support', 'help', 'staff', 'representative', 'agent',
    'response', 'helpful', 'customer care', 'assistance', 'team'
  ],
  'Pricing': [
    'price', 'cost', 'expensive', 'cheap', 'affordable', 'value',
    'money', 'worth', 'pricing', 'budget', 'discount', 'sale'
  ],
  'Features': [
    'feature', 'functionality', 'capability', 'option', 'work',
    'function', 'tool', 'ability', 'performance', 'specs'
  ],
  'Brand Image': [
    'brand', 'company', 'reputation', 'trust', 'image', 'perception',
    'experience', 'impression', 'feel', 'professional'
  ],
  'Competition': [
    'competition', 'competitor', 'compare', 'versus', 'alternative',
    'better than', 'worse than', 'similar', 'different', 'vs'
  ],
  'Innovation': [
    'innovation', 'innovative', 'new', 'modern', 'advanced', 'technology',
    'cutting edge', 'latest', 'updated', 'upgrade', 'future'
  ]
};

/**
 * Extract main topic from text
 * @param {string} text - Text to analyze
 * @returns {string} - Extracted topic
 */
export const extractTopic = (text) => {
  if (!text || typeof text !== 'string') {
    return 'Brand Image';
  }

  const lowerText = text.toLowerCase();
  const topicScores = {};

  // Initialize scores
  topics.forEach(topic => {
    topicScores[topic] = 0;
  });

  // Calculate scores based on keyword matches
  Object.keys(topicKeywords).forEach(topic => {
    topicKeywords[topic].forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        topicScores[topic] += matches.length;
      }
    });
  });

  // Find topic with highest score
  let maxScore = 0;
  let detectedTopic = 'Brand Image'; // Default topic

  Object.keys(topicScores).forEach(topic => {
    if (topicScores[topic] > maxScore) {
      maxScore = topicScores[topic];
      detectedTopic = topic;
    }
  });

  return detectedTopic;
};

/**
 * Get all topics for filtering
 * @returns {Array} - Array of topic names
 */
export const getAllTopics = () => {
  return topics;
};