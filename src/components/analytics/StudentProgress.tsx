import React from 'react';
import { BarChart2, Clock, CheckCircle } from 'lucide-react';

interface StudentProgressProps {
  analytics: {
    totalWatchTime: number;
    completedVideos: number;
    totalVideos: number;
    averageProgress: number;
    recentActivity: Array<{
      courseTitle: string;
      lessonTitle: string;
      progress: number;
      lastWatched: string;
    }>;
  };
}

const StudentProgress: React.FC<StudentProgressProps> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total Watch Time</p>
              <p className="text-2xl font-bold">
                {Math.round(analytics.totalWatchTime / 60)} mins
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Completed Videos</p>
              <p className="text-2xl font-bold">
                {analytics.completedVideos}/{analytics.totalVideos}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-6 h-6 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Average Progress</p>
              <p className="text-2xl font-bold">{analytics.averageProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {analytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{activity.courseTitle}</h4>
                <p className="text-sm text-gray-600">{activity.lessonTitle}</p>
              </div>
              <div className="text-right">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.lastWatched).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;