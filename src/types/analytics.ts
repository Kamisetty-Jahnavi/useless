export interface AnalyticsData {
  users: number;
  courses: number;
  completionRate: number;
  engagementRate: number;
  dailyStats: Array<{
    date: string;
    activeUsers: number;
    courseCompletions: number;
  }>;
}