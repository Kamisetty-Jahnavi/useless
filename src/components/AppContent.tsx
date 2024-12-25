import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthOptions from './auth/AuthOptions';
import LoginForm from './auth/LoginForm';
import StudentAccess from './auth/StudentAccess';
import AdminDashboard from './admin/AdminDashboard';
import StudentDashboard from './student/StudentDashboard';
import Header from './common/Header';

const AppContent = () => {
  const { isAuthenticated, user, login } = useAuth();
  const [authRole, setAuthRole] = useState<'admin' | 'student' | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    if (!authRole) {
      return <AuthOptions onSelectRole={setAuthRole} />;
    }

    if (authRole === 'admin') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <button
              onClick={() => setAuthRole(null)}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
            <LoginForm onLogin={handleLogin} role="admin" />
          </div>
        </div>
      );
    }

    return <StudentAccess onLogin={handleLogin} onBack={() => setAuthRole(null)} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1">
        <Header />
        {user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
      </div>
    </div>
  );
};

export default AppContent;