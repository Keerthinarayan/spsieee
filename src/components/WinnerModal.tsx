import React from 'react';

interface WinnerModalProps {
  playerName: string;
  score: number;
  onRestart: () => void;
}

export function WinnerModal({ playerName, score, onRestart }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
        <h2 className="text-4xl font-bold text-purple-600 mb-4">🎉 Congratulations! 🎉</h2>
        <p className="text-xl mb-2">{playerName}</p>
        <p className="text-2xl font-bold mb-6">Final Score: {score}</p>
        <p className="text-gray-600 mb-8">You've completed Grid Wars!</p>
        <button
          onClick={onRestart}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}