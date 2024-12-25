import React, { useState } from 'react';
import { Users, BookOpen, Video, ListTodo, BarChart2 } from 'lucide-react';
import SectionManagement from './SectionManagement';
import StudentManagement from './StudentManagement';
import Analytics from '../analytics/Analytics';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sections' | 'students' | 'analytics'>('sections');

  const tabs = [
    { id: 'sections', label: 'Sections', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'sections' && <SectionManagement />}
          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'analytics' && <Analytics data={{
            users: 156,
            courses: 12,
            completionRate: 78,
            engagementRate: 85,
            dailyStats: []
          }} />}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;