import React from 'react';
import { ChevronRight } from 'lucide-react';

interface GameBoxProps {
  index: number;
  isCurrentPosition: boolean;
  isAnswered: boolean;
  isClickable: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  onClick: () => void;
}

export function GameBox({ 
  index, 
  isCurrentPosition, 
  isAnswered, 
  isClickable,
  difficulty,
  onClick 
}: GameBoxProps) {
  const getDifficultyStyles = () => {
    const baseStyles = "transition-all duration-500";
    switch (difficulty) {
      case 'easy':
        return `${baseStyles} from-green-400/80 via-green-500/80 to-green-600/80 shadow-green-400/30`;
      case 'medium':
        return `${baseStyles} from-yellow-400/80 via-yellow-500/80 to-yellow-600/80 shadow-yellow-400/30`;
      case 'hard':
        return `${baseStyles} from-red-400/80 via-red-500/80 to-red-600/80 shadow-red-400/30`;
    }
  };

  const boxStyles = `
    aspect-square rounded-lg p-2 relative
    ${isCurrentPosition ? 'transform scale-110 z-10' : 'transform-gpu hover:scale-105'}
    ${isClickable ? 'cursor-pointer hover:shadow-xl' : 'cursor-not-allowed'}
    ${isAnswered ? 'opacity-40' : 'opacity-100'}
    ${isCurrentPosition ? 'ring-4 ring-purple-500/60 shadow-lg shadow-purple-500/30' : ''}
    bg-gradient-to-br ${getDifficultyStyles()}
    backdrop-blur-sm
    transition-all duration-300 ease-out
    hover:shadow-lg hover:backdrop-blur-md
    group
  `;

  const getMoveIndicators = () => {
    const moves = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array(moves).fill(0).map((_, i) => (
      <ChevronRight 
        key={i}
        className="w-4 h-4 text-white drop-shadow-glow transition-transform"
        style={{ 
          transform: `translateX(${i * -4}px)`,
          animation: `float ${1 + i * 0.2}s ease-in-out infinite alternate`
        }}
      />
    ));
  };

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={boxStyles}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <span className="text-lg font-bold text-white drop-shadow-glow transition-all duration-300 group-hover:scale-110 inline-block">
          {index + 1}
        </span>
      </div>

      {/* Current position indicators */}
      {isCurrentPosition && (
        <>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex">
            {getMoveIndicators()}
          </div>
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-lg animate-ping ring-2 ring-purple-500/30" />
        </>
      )}
    </button>
  );
}