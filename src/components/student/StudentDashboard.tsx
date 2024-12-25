import React, { useState, useEffect } from 'react';
import CourseCard from '../CourseCard';
import ProgressChart from '../ProgressChart';
import TodoList from '../teacher/TodoList';
import { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';

const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Digital Identity',
    description: 'Learn the fundamentals of digital identity and security',
    progress: 75,
    modules: [
      {
        id: 'm1',
        title: 'Identity Basics',
        completed: true,
        lessons: [
          { id: 'l1', title: 'What is Digital Identity?', content: '', completed: true, duration: 30 },
          { id: 'l2', title: 'Identity Verification', content: '', completed: true, duration: 45 }
        ]
      }
    ]
  }
];

const mockProgressData = [
  { subject: 'Course Progress', progress: 75 },
  { subject: 'Assignments', progress: 60 },
  { subject: 'Quizzes', progress: 85 },
  { subject: 'Overall', progress: 73 }
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [progressData, setProgressData] = useState(mockProgressData);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Todo List</h2>
          <TodoList section={user?.section || ''} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">My Progress</h2>
          <ProgressChart data={progressData} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;