import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartData {
  name: string;
  value: number;
  color: string;
}

const currentSales = 82;
const targetSales = 100;

const data: GaugeChartData[] = [
  { name: 'progress', value: currentSales, color: '#3b82f6' },
  { name: 'remaining', value: targetSales - currentSales, color: '#e2e8f0' }
];

const GaugeIndicator = ({ percentage }: { percentage: number }) => {
  const radius = 120;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        className="transform -rotate-90 w-60 h-60"
        viewBox="0 0 256 256"
      >
        <circle
          cx="128"
          cy="128"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="24"
          strokeDasharray={circumference}
          strokeDashoffset="0"
          strokeLinecap="round"
        />
        <circle
          cx="128"
          cy="128"
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="24"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-[#1e293b]">{percentage}%</span>
        <span className="text-sm text-muted-foreground mt-2">of target</span>
      </div>
    </div>
  );
};

const SalesMetrics = () => (
  <div className="grid grid-cols-2 gap-8 mt-8">
    <div className="text-center">
      <p className="text-3xl font-bold text-[#1e293b]">
        ${(currentSales * 10000).toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground mt-1">Current Sales</p>
    </div>
    <div className="text-center">
      <p className="text-3xl font-bold text-[#1e293b]">
        ${(targetSales * 10000).toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground mt-1">Target Sales</p>
    </div>
  </div>
);

const SalesGaugeChart = () => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border w-full h-full">
      <h2 className="text-xl font-medium text-[#625b71] mb-8">Sales Target Meter</h2>
      
      <div className="h-[300px] sm:h-[400px] w-full flex items-center justify-center">
        <GaugeIndicator percentage={currentSales} />
      </div>

      <SalesMetrics />
    </div>
  );
};

export default SalesGaugeChart;