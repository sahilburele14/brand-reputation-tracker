/**
 * Data Generator Utility
 * Generates simulated brand mentions for testing and demo purposes
 */

import { analyzeSentiment } from './sentimentAnalyzer';
import { extractTopic } from './topicExtractor';

export const platforms = [
  'Twitter',
  'Reddit',
  'Facebook',
  'LinkedIn',
  'News',
  'Blogs',
  'Forums'
];

const sampleTexts = {
  positive: [
    'Absolutely love this brand! Best purchase I ever made',
    'Outstanding customer service, highly recommend to everyone',
    'The quality is exceptional, worth every single penny',
    'This company really cares about their customers',
    'Impressive innovation, definitely ahead of the competition',
    'Great experience from start to finish',
    'The product exceeded all my expectations',
    'Fantastic features and excellent build quality',
    'Best customer support team I have ever dealt with',
    'Amazing value for money, could not be happier',
    'Wonderful product, will definitely buy again',
    'Perfect solution to my problem, thank you',
    'Superb quality and fast delivery',
    'Brilliant design and functionality',
    'Very pleased with my purchase'
  ],
  negative: [
    'Very disappointed with the quality, not what I expected',
    'Customer service was terrible, not helpful at all',
    'Completely overpriced for what you actually get',
    'Had a really bad experience, would not recommend',
    'Product broke after just a few days of use',
    'Waste of money, very poor quality',
    'Terrible experience with support team',
    'Failed to meet basic expectations',
    'Frustrated with the lack of features',
    'Awful product, returned it immediately',
    'Very unhappy with this purchase',
    'Disappointing quality and service',
    'Avoid this brand, not worth it',
    'Poor value for the high price',
    'Worst customer experience ever'
  ],
  neutral: [
    'Just bought this product, will update later with review',
    'Saw an advertisement for this brand today',
    'Currently comparing this with other available options',
    'Does anyone have experience with this company?',
    'New product launch was just announced',
    'Looking at different brands before making decision',
    'Considering purchasing this next month',
    'Read some reviews, still undecided',
    'Checking out their website right now',
    'Heard about this brand from a friend',
    'What are people saying about this product?',
    'Trying to decide between this and competitor',
    'Anyone used this before? Need opinions',
    'Saw this at the store today',
    'Researching this brand currently'
  ]
};

/**
 * Generate a random mention
 * @returns {Object} - Generated mention object
 */
export const generateMention = () => {
  // Weighted random sentiment selection
  const rand = Math.random();
  let sentimentType;
  
  if (rand < 0.45) {
    sentimentType = 'positive';
  } else if (rand < 0.75) {
    sentimentType = 'neutral';
  } else {
    sentimentType = 'negative';
  }

  const textOptions = sampleTexts[sentimentType];
  const text = textOptions[Math.floor(Math.random() * textOptions.length)];
  
  const { sentiment, score } = analyzeSentiment(text);
  const topic = extractTopic(text);
  const platform = platforms[Math.floor(Math.random() * platforms.length)];

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text,
    platform,
    sentiment,
    sentimentScore: score,
    topic,
    timestamp: new Date(),
    author: `user${Math.floor(Math.random() * 10000)}`,
    reach: Math.floor(Math.random() * 50000) + 100,
    engagement: Math.floor(Math.random() * 2000) + 10,
    location: getRandomLocation()
  };
};

/**
 * Get random location
 * @returns {string} - Location string
 */
const getRandomLocation = () => {
  const locations = [
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Sydney, Australia',
    'Toronto, Canada',
    'Berlin, Germany',
    'Paris, France',
    'Singapore',
    'Mumbai, India',
    'São Paulo, Brazil'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

/**
 * Generate initial batch of mentions
 * @param {number} count - Number of mentions to generate
 * @returns {Array} - Array of mention objects
 */
export const generateInitialMentions = (count = 20) => {
  const mentions = [];
  for (let i = 0; i < count; i++) {
    mentions.push(generateMention());
  }
  return mentions;
};