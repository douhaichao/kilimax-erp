import React from 'react';
import { TrendingUp } from 'lucide-react';

export const DashboardGreeting = () => (
  <div className="mb-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Karibu Boss! 🚀</h1>
        <p className="text-green-100 text-lg">Ready to make sales magic happen today?</p>
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-sm">Business is LIVE</span>
          </div>
          <div className="text-sm">🎯 Target: KES 15,000</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-4xl font-bold">55%</div>
        <div className="text-green-200 text-sm">to daily goal</div>
      </div>
    </div>
  </div>
);