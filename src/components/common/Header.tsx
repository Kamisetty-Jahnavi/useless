import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <User className="w-6 h-6 text-gray-500 mr-2" />
            <span className="font-medium text-gray-900">{user?.name}</span>
            <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
              {user?.role}
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-5 h-5 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;