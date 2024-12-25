import React, { useState } from 'react';
import { Users, BookOpen, BarChart2, Plus } from 'lucide-react';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import StudentManagement from '../teacher/StudentManagement';
import Analytics from '../analytics/Analytics';
import type { Course } from '../../types/course';

const mockDailyStats = [
  { date: '2024-02-01', activeUsers: 120, courseCompletions: 45 },
  { date: '2024-02-02', activeUsers: 145, courseCompletions: 52 },
  { date: '2024-02-03', activeUsers: 162, courseCompletions: 58 },
  { date: '2024-02-04', activeUsers: 159, courseCompletions: 63 },
  { date: '2024-02-05', activeUsers: 178, courseCompletions: 71 },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'analytics'>('courses');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleCreateCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      ...courseData,
      id: crypto.randomUUID(),
      duration: courseData.modules?.reduce((total, module) => 
        total + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0), 0
      ) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Course;

    setCourses([...courses, newCourse]);
    setShowCourseForm(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Courses</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'students' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {activeTab === 'courses' && (
        <>
          <button
            onClick={() => setShowCourseForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-6"
          >
            <Plus className="w-5 h-5" />
            Add Course
          </button>
          {showCourseForm ? (
            <CourseForm
              onSubmit={handleCreateCourse}
              onCancel={() => setShowCourseForm(false)}
            />
          ) : (
            <CourseList
              courses={courses}
              onEdit={() => {}}
              onDelete={(id) => setCourses(courses.filter(c => c.id !== id))}
            />
          )}
        </>
      )}

      {activeTab === 'students' && <StudentManagement />}
      
      {activeTab === 'analytics' && (
        <Analytics data={{
          users: 156,
          courses: courses.length,
          completionRate: 78,
          engagementRate: 85,
          dailyStats: mockDailyStats
        }} />
      )}
    </div>
  );
};

export default AdminDashboard;