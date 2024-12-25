import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  };
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(index);
    setShowFeedback(true);
    onAnswer(index === question.correctAnswer);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
            className={`w-full p-4 text-left rounded-lg border transition-colors
              ${selectedOption === null 
                ? 'hover:bg-gray-50' 
                : index === question.correctAnswer
                  ? 'bg-green-50 border-green-500'
                  : selectedOption === index
                    ? 'bg-red-50 border-red-500'
                    : ''
              }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedOption !== null && index === question.correctAnswer && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {selectedOption === index && index !== question.correctAnswer && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showFeedback && question.explanation && (
        <div className={`p-4 rounded-lg ${
          selectedOption === question.correctAnswer 
            ? 'bg-green-50 text-green-800'
            : 'bg-red-50 text-red-800'
        }`}>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;