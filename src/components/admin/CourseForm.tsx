import React, { useState } from 'react';
import { BookOpen, Plus, X } from 'lucide-react';
import type { Course, Module, Lesson } from '../../types/course';

interface CourseFormProps {
  onSubmit: (course: Partial<Course>) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, onCancel }) => {
  const [course, setCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    level: 'beginner',
    modules: [],
  });

  const [currentModule, setCurrentModule] = useState<Partial<Module>>({
    title: '',
    description: '',
    lessons: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(course);
  };

  const addModule = () => {
    if (currentModule.title && currentModule.description) {
      setCourse(prev => ({
        ...prev,
        modules: [...(prev.modules || []), {
          ...currentModule,
          id: crypto.randomUUID(),
          order: (prev.modules?.length || 0) + 1,
          lessons: currentModule.lessons || [],
        }],
      }));
      setCurrentModule({ title: '', description: '', lessons: [] });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Course</h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title
          </label>
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={course.level}
            onChange={(e) => setCourse({ ...course, level: e.target.value as Course['level'] })}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Modules</h3>
          
          <div className="space-y-4 mb-4">
            {course.modules?.map((module, index) => (
              <div key={module.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">{module.title}</h4>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={currentModule.title}
              onChange={(e) => setCurrentModule({ ...currentModule, title: e.target.value })}
              placeholder="Module Title"
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              value={currentModule.description}
              onChange={(e) => setCurrentModule({ ...currentModule, description: e.target.value })}
              placeholder="Module Description"
              className="w-full p-3 border rounded-lg"
              rows={2}
            />
            <button
              type="button"
              onClick={addModule}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Module
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;