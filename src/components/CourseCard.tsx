import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={`https://source.unsplash.com/800x600/?education,${course.title}`}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span>{course.modules.length} modules</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>
              {course.modules.reduce((acc, module) => 
                acc + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0), 0
              )} mins
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 mt-1">{course.progress}% complete</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;