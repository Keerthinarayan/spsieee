import React, { useState } from 'react';
import { OscilloscopeWave } from './animations/OscilloscopeWave';

interface StartScreenProps {
  onStart: (playerName: string) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStart(playerName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-blue-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Animated waves */}
      <div className="absolute inset-0">
        <OscilloscopeWave />
      </div>

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10 border border-purple-200">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
            Grid Wars
          </h1>
          <p className="text-gray-600">Enter the signal processing challenge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
              Enter Your Group Name
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-white/50 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter group name..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 font-medium"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}