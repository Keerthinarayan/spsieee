import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question;
  onClose: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuestionModal({ question, onClose, onAnswer }: QuestionModalProps) {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = answer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (correct) {
        onAnswer(true);
      } else {
        setShowFeedback(false);
        setAnswer('');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">{question.text}</h3>
          
          {/* Image */}
          {question.imageUrl && (
            <div className="mb-6">
              <img
                src={question.imageUrl}
                alt="Question"
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
          )}

          {/* Audio */}
          {question.audioUrl && (
            <div className="mb-6">
              <audio controls className="w-full">
                <source src={question.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        {showFeedback ? (
          <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="text-xl font-bold">{isCorrect ? 'Correct!' : 'Wrong Answer!'}</p>
            {!isCorrect && <p>Try again!</p>}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer:
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Type your answer here..."
                autoComplete="off"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                disabled={!answer.trim()}
              >
                Submit Answer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}