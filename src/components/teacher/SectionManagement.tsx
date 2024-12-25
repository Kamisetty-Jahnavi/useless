import React, { useState } from 'react';
import { Plus, Users, Video, ListTodo, BarChart2 } from 'lucide-react';
import TodoList from './TodoList';
import VideoContent from './VideoContent';
import StudentAnalytics from './StudentAnalytics';

interface Section {
  id: string;
  name: string;
  studentCount: number;
}

const SectionManagement: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'todo' | 'videos' | 'students' | 'analytics'>('todo');
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  const addSection = () => {
    if (!newSectionName.trim()) return;

    const newSection = {
      id: crypto.randomUUID(),
      name: newSectionName,
      studentCount: 0
    };

    setSections([...sections, newSection]);
    setNewSectionName('');
    setShowAddSection(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Section Management</h2>
        <button
          onClick={() => setShowAddSection(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </button>
      </div>

      {showAddSection && (
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            placeholder="Enter section name"
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={addSection}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add
          </button>
          <button
            onClick={() => setShowAddSection(false)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`w-full p-4 rounded-lg text-left ${
                selectedSection === section.id
                  ? 'bg-blue-50 border-blue-500 border-2'
                  : 'bg-white border hover:bg-gray-50'
              }`}
            >
              <h3 className="font-medium">{section.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <Users className="w-4 h-4" />
                <span>{section.studentCount} students</span>
              </div>
            </button>
          ))}
        </div>

        {selectedSection && (
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('todo')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 ${
                      activeTab === 'todo'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <ListTodo className="w-4 h-4" />
                    Todo List
                  </button>
                  <button
                    onClick={() => setActiveTab('videos')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 ${
                      activeTab === 'videos'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Videos
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 ${
                      activeTab === 'analytics'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <BarChart2 className="w-4 h-4" />
                    Analytics
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'todo' && (
                  <TodoList section={sections.find(s => s.id === selectedSection)?.name || ''} />
                )}
                {activeTab === 'videos' && (
                  <VideoContent section={sections.find(s => s.id === selectedSection)?.name || ''} />
                )}
                {activeTab === 'analytics' && (
                  <StudentAnalytics />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionManagement;