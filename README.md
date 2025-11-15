Brand Reputation Tracker
A real-time brand mention and reputation monitoring application that tracks conversations across multiple social media platforms, analyzes sentiment, and provides actionable insights through an intuitive dashboard.
🚀 Features
Core Functionality

Real-time Monitoring: Track brand mentions as they happen across multiple platforms
Multi-Platform Support: Monitor Twitter, Reddit, Facebook, LinkedIn, News sites, Blogs, and Forums
Sentiment Analysis: Automatic classification of mentions as Positive, Negative, or Neutral
Topic Clustering: Intelligent categorization into themes like Product Quality, Customer Service, Pricing, etc.
Spike Detection: Automated alerts for unusual patterns in mention volume or sentiment
Interactive Dashboard: Clean, modern interface with real-time data visualization

Advanced Features

Search & Filter: Powerful filtering by sentiment, platform, keywords, and topics
Data Visualization: Charts showing sentiment distribution, topic trends, platform breakdown, and timeline analysis
Export Functionality: Download mention data as CSV for further analysis
Alert System: Real-time notifications for critical events and trends
Engagement Metrics: Track reach and engagement for each mention

📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14.0 or higher)
npm (v6.0 or higher) or yarn (v1.22 or higher)

🛠️ Installation
Step 1: Clone or Create Project Directory
bashmkdir brand-reputation-tracker
cd brand-reputation-tracker
Step 2: Initialize Project
bashnpm init -y
Step 3: Install Dependencies
bashnpm install react react-dom react-scripts recharts lucide-react
Step 4: Create Project Structure
Create the following directory structure:
brand-reputation-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── StatsCards.js
│   │   ├── AlertsPanel.js
│   │   ├── Charts.js
│   │   ├── Filters.js
│   │   └── MentionsList.js
│   ├── utils/
│   │   ├── sentimentAnalyzer.js
│   │   ├── topicExtractor.js
│   │   ├── dataGenerator.js
│   │   └── spikeDetector.js
│   ├── hooks/
│   │   └── useMonitoring.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
Step 5: Copy Files
Copy all the provided code files into their respective locations according to the project structure above.
🎮 Running the Application
Development Mode
bashnpm start
This will start the development server at http://localhost:3000. The page will automatically reload when you make changes.
Production Build
bashnpm run build
Creates an optimized production build in the build folder.
📖 How to Use
1. Start Monitoring

Click the "Start Monitoring" button in the header
The system will begin tracking mentions in real-time
New mentions appear every 2-3 seconds

2. View Analytics

Stats Cards: See total mentions, positive/negative counts, and average sentiment
Charts: Analyze sentiment distribution, topics, platforms, and trends
Timeline: Track sentiment changes over time

3. Filter Mentions

Use the search bar to find specific keywords or topics
Filter by sentiment type (Positive, Neutral, Negative)
Filter by platform (Twitter, Reddit, Facebook, etc.)
Multiple filters can be combined

4. Respond to Alerts

Monitor the alerts panel for important notifications
Alerts include:

Volume spikes (sudden increase in mentions)
Negative sentiment surges (high negative mention rate)
Platform-specific spikes
Trending topics



5. Export Data

Click "Export CSV" to download all mention data
Use exported data for further analysis or reporting

🏗️ Architecture
Component Structure
App
├── Header (monitoring controls)
├── AlertsPanel (real-time alerts)
├── StatsCards (key metrics)
├── Charts (data visualizations)
├── Filters (search and filtering)
└── MentionsList (mention feed)
Utility Functions

sentimentAnalyzer.js: Analyzes text sentiment using keyword matching
topicExtractor.js: Categorizes mentions into topics
dataGenerator.js: Simulates real-time mentions (replace with API integration)
spikeDetector.js: Detects unusual patterns and generates alerts

Custom Hooks

useMonitoring.js: Manages monitoring state, mention collection, and statistics

🔧 Customization
Adding Real Data Sources
Replace the dataGenerator.js simulated data with real API integrations:
javascript// Example: Twitter API integration
const fetchTwitterMentions = async (brandName) => {
  const response = await fetch(`https://api.twitter.com/mentions?q=${brandName}`);
  const data = await response.json();
  return data.map(tweet => ({
    id: tweet.id,
    text: tweet.text,
    platform: 'Twitter',
    // ... map other fields
  }));
};
Adjusting Sentiment Analysis
Modify sentimentAnalyzer.js to use advanced NLP libraries:
javascript// Example: Using sentiment library
import Sentiment from 'sentiment';
const sentiment = new Sentiment();

export const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);
  return {
    sentiment: result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral',
    score: result.comparative
  };
};
Customizing Alerts
Adjust thresholds in spikeDetector.js:
javascript// Change spike detection threshold
if (recentRate > olderRate * 1.5) { // Changed from 2x to 1.5x
  // Trigger alert
}
🎨 Styling
The application uses Tailwind CSS via CDN for styling. To customize:

Colors: Modify gradient and color classes in components
Layout: Adjust grid and flex classes
Spacing: Change padding and margin utilities

📊 Data Flow
User Action → Hook (useMonitoring)
                ↓
        Generate/Fetch Mention
                ↓
        Sentiment Analysis
                ↓
        Topic Extraction
                ↓
        Add to State
                ↓
        Spike Detection
                ↓
        Update UI Components
🐛 Troubleshooting
Issue: Charts not displaying
Solution: Ensure recharts is properly installed: npm install recharts
Issue: Icons not showing
Solution: Verify lucide-react installation: npm install lucide-react
Issue: Slow performance with many mentions
Solution: Limit mentions to last 200 (already implemented in useMonitoring hook)
🚀 Future Enhancements

 Real API integrations (Twitter, Reddit, etc.)
 User authentication and saved dashboards
 Custom brand keyword management
 Email/SMS alert notifications
 Advanced NLP sentiment analysis
 Historical data storage and trends
 Competitor comparison
 Report generation (PDF/Excel)
 Mobile app version

📝 License
MIT License - Feel free to use this project for personal or commercial purposes.
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
📧 Support
For issues or questions, please open an issue on the project repository.

Built with React, Recharts, and Tailwind CSS ❤️