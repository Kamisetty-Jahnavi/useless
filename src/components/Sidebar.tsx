import React from 'react';
import { BookOpen, BarChart2, Settings, Home } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-8 h-8 text-blue-400" />
        <h1 className="text-xl font-bold">EduAnalytics</h1>
      </div>
      
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <BookOpen className="w-5 h-5" />
          <span>Courses</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;