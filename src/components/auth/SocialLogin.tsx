import React from 'react';
import { Google, Facebook, Github } from 'lucide-react';

interface SocialLoginProps {
  onSocialLogin: (provider: 'google' | 'facebook' | 'github') => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onSocialLogin }) => {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-gray-600">Or continue with</p>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onSocialLogin('google')}
          className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
        >
          <Google className="w-5 h-5" />
          <span className="sr-only">Google</span>
        </button>
        <button
          onClick={() => onSocialLogin('facebook')}
          className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
        >
          <Facebook className="w-5 h-5" />
          <span className="sr-only">Facebook</span>
        </button>
        <button
          onClick={() => onSocialLogin('github')}
          className="flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
        >
          <Github className="w-5 h-5" />
          <span className="sr-only">Github</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;