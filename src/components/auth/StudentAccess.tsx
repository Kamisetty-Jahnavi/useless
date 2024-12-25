import React, { useState } from 'react';
import LoginForm from './LoginForm';
import StudentRegistration from './StudentRegistration';

interface StudentAccessProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
}

const StudentAccess: React.FC<StudentAccessProps> = ({ onLogin, onBack }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        
        {showRegistration ? (
          <StudentRegistration onBack={() => setShowRegistration(false)} />
        ) : (
          <>
            <LoginForm onLogin={onLogin} role="student" />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowRegistration(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                New student? Create an account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentAccess;