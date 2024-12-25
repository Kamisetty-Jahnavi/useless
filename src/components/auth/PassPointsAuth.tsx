import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface PassPointsAuthProps {
  mode: 'register' | 'login';
  onComplete: (points: Point[]) => void;
  onBack: () => void;
  section?: string;
}

const PassPointsAuth: React.FC<PassPointsAuthProps> = ({
  mode,
  onComplete,
  onBack,
  section
}) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [message, setMessage] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (points.length >= 5) {
      setMessage('Maximum 5 points allowed');
      return;
    }

    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints([...points, { x, y }]);
  };

  const handleSubmit = () => {
    if (points.length < 3) {
      setMessage('Please select at least 3 points');
      return;
    }
    onComplete(points);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold mt-4">
          {mode === 'register' ? 'Create PassPoints Password' : 'Login with PassPoints'}
        </h2>
        {section && (
          <p className="text-gray-600 mt-2">Section: {section}</p>
        )}
      </div>

      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <img
          ref={imageRef}
          src="https://source.unsplash.com/1600x900/?abstract,pattern"
          alt="Authentication"
          className="w-full cursor-crosshair"
          onClick={handleImageClick}
        />
        {points.map((point, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-blue-500 rounded-full -translate-x-2 -translate-y-2"
            style={{ left: point.x, top: point.y }}
          />
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <p className="text-sm text-gray-600">
          {mode === 'register' 
            ? 'Select 3-5 points on the image as your password'
            : 'Click your password points in the correct order'}
        </p>
        
        {message && (
          <p className="text-red-500 text-sm">{message}</p>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {mode === 'register' ? 'Set Password' : 'Login'}
          </button>
          <button
            onClick={() => setPoints([])}
            className="flex items-center justify-center px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassPointsAuth;