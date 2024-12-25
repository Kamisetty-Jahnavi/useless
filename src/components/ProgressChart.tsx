import React from 'react';
import { BarChart2 } from 'lucide-react';

interface ProgressChartProps {
  data: {
    subject: string;
    progress: number;
  }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Learning Progress</h2>
      </div>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.subject}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.subject}</span>
              <span className="text-sm text-gray-500">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;