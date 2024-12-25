import React from 'react';
import { BarChart2, Users, BookOpen, Award } from 'lucide-react';
import StatCard from './StatCard';
import ActivityChart from './ActivityChart';
import type { AnalyticsData } from '../../types/analytics';

interface AnalyticsProps {
  data: AnalyticsData;
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
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <ActivityChart data={data.dailyStats} />
    </div>
  );
};

export default Analytics;