import React from 'react';
import { UserCircle, Users } from 'lucide-react';

interface AuthOptionsProps {
  onSelectRole: (role: 'admin' | 'student') => void;
}

const AuthOptions: React.FC<AuthOptionsProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to Digital Identity Learning Analysis</h2>
        <div className="space-y-4">
          <button
            onClick={() => onSelectRole('admin')}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <UserCircle className="w-6 h-6" />
            Teacher Login
          </button>
          <button
            onClick={() => onSelectRole('student')}
            className="w-full flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Users className="w-6 h-6" />
            Student Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthOptions;