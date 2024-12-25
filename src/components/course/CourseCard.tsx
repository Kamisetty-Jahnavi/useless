import React from 'react';
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types/course';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-48 overflow-hidden">
          <img
            src={course.thumbnail || `https://source.unsplash.com/800x600/?education,${course.title}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
              {course.level}
            </span>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{course.rating}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{course.modules.length} modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{course.enrolledCount} students</span>
            </div>
          </div>

          {course.progress !== undefined && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 mt-1">
                {course.progress}% complete
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;