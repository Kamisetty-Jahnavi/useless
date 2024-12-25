import React from 'react';
import { BarChart2, Users, BookOpen, Award } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AnalyticsProps {
  data: {
    users: number;
    courses: number;
    completionRate: number;
    engagementRate: number;
    dailyStats: Array<{
      date: string;
      activeUsers: number;
      courseCompletions: number;
    }>;
  };
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  const stats = [
    {
      title: 'Total Users',
      value: data.users,
      icon: Users,
      change: '+12%',
      positive: true
    },
    {
      title: 'Active Courses',
      value: data.courses,
      icon: BookOpen,
      change: '+5%',
      positive: true
    },
    {
      title: 'Completion Rate',
      value: `${data.completionRate}%`,
      icon: Award,
      change: '-2%',
      positive: false
    },
    {
      title: 'Engagement Rate',
      value: `${data.engagementRate}%`,
      icon: BarChart2,
      change: '+8%',
      positive: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <div className={`flex items-center mt-2 ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm">{stat.change}</span>
                  <span className="text-xs ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-6">Platform Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#3B82F6" 
                name="Active Users"
              />
              <Line 
                type="monotone" 
                dataKey="courseCompletions" 
                stroke="#10B981" 
                name="Course Completions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;