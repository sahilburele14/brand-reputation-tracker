/**
 * Alerts Panel Component
 * Displays real-time alerts and notifications
 */

import React from 'react';
import { Bell, X, AlertTriangle, Info, TrendingUp } from 'lucide-react';

const AlertsPanel = ({ alerts, onDismissAlert }) => {
  if (alerts.length === 0) return null;

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          text: 'text-red-900'
        };
      case 'high':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: 'text-orange-600',
          text: 'text-orange-900'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          text: 'text-yellow-900'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          text: 'text-blue-900'
        };
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'volume_spike':
        return TrendingUp;
      case 'negative_sentiment':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  return (
    <div className="mb-6 space-y-2">
      {alerts.map(alert => {
        const styles = getAlertStyles(alert.severity);
        const IconComponent = getAlertIcon(alert.type);
        
        return (
          <div 
            key={alert.id} 
            className={`flex items-start gap-3 p-4 rounded-lg border ${styles.bg} ${styles.border} animate-slideIn`}
          >
            <IconComponent className={`w-5 h-5 ${styles.icon} flex-shrink-0 mt-0.5`} />
            
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${styles.text}`}>
                {alert.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </p>
            </div>
            
            <button
              onClick={() => onDismissAlert(alert.id)}
              className="p-1 hover:bg-white/50 rounded transition-colors flex-shrink-0"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AlertsPanel;