import React from 'react';
import { Award, Trophy, Star, Zap } from 'lucide-react';

interface AchievementBadgeProps {
  type: 'course' | 'quiz' | 'streak' | 'engagement';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  title: string;
  description: string;
  earned?: boolean;
}

const BadgeIcon = {
  course: Award,
  quiz: Trophy,
  streak: Zap,
  engagement: Star
};

const BadgeColors = {
  bronze: 'bg-amber-100 text-amber-800',
  silver: 'bg-gray-100 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-blue-100 text-blue-800'
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  level,
  title,
  description,
  earned = false
}) => {
  const Icon = BadgeIcon[type];
  const colorClass = BadgeColors[level];

  return (
    <div className={`relative p-4 rounded-lg ${earned ? colorClass : 'bg-gray-50'}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${earned ? '' : 'bg-gray-200'}`}>
          <Icon className={`w-6 h-6 ${earned ? '' : 'text-gray-400'}`} />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {!earned && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center rounded-lg">
          <span className="text-sm font-medium text-gray-500">Locked</span>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;