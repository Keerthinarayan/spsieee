import React, { useState, useEffect } from 'react';
import { Question, GameState } from '../types';
import { QuestionModal } from './QuestionModal';
import { SpectrumAnalyzer } from './animations/SpectrumAnalyzer';
import { WaveAnimation } from './animations/WaveAnimation';
import { EnergyParticles } from './animations/EnergyParticles';
import { GameBox } from './GameBox';
import { Snowflake, Sparkles } from 'lucide-react';

interface GameBoardProps {
  gameState: GameState;
  questions: Question[];
  onAnswerQuestion: (questionId: number, isCorrect: boolean) => void;
}

export function GameBoard({ gameState, questions, onAnswerQuestion }: GameBoardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showNewYearPopup, setShowNewYearPopup] = useState(true);
  const TOTAL_BOXES = 50;

  useEffect(() => {
    const hasShown = sessionStorage.getItem('newYearPopupShown');
    if (!hasShown) {
      setShowNewYearPopup(true);
      sessionStorage.setItem('newYearPopupShown', 'true');
    }
  }, []);

  // Add dev tools detection
  useEffect(() => {
    const detectDevTools = () => {
      if (
        window.outerHeight - window.innerHeight > 200 || 
        window.outerWidth - window.innerWidth > 200
      ) {
        document.body.innerHTML = 'Access Denied';
        window.location.href = '/access-denied';
      }
    };

    window.addEventListener('resize', detectDevTools);
    return () => window.removeEventListener('resize', detectDevTools);
  }, []);

  const getDifficulty = (index: number): 'easy' | 'medium' | 'hard' => {
    if (index < 20) return 'easy';
    if (index < 40) return 'medium';
    return 'hard';
  };

  const handleBoxClick = (index: number) => {
    if (index === gameState.currentPosition) {
      const question = questions.find(q => q.id === index + 1);
      if (question) {
        setSelectedQuestion(question);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8 relative overflow-hidden">
      {showNewYearPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-b from-purple-900 to-blue-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Animated snowflakes in popup */}
            {[...Array(20)].map((_, i) => (
              <Snowflake
                key={i}
                className="absolute text-white/20 animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}px`,
                  animation: `fall ${3 + Math.random() * 3}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
            
            <div className="text-center relative z-10">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-200 mb-4">
                Cheers to a fantastic New Year ahead!
              </h2>
              <p className="text-purple-100 mb-6">
                from IEEE SPS Society
              </p>
              <button
                onClick={() => setShowNewYearPopup(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                Continue to Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Winter theme elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Snowflake
            key={i}
            className="absolute text-white/20 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}px`,
              animation: `fall ${3 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 10 + 10}px`
            }}
          />
        ))}
      </div>

      {/* Existing background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <EnergyParticles />
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-20">
        <WaveAnimation />
      </div>
      
      {/* Score panel */}
      <div className="fixed top-4 left-4 bg-black/40 backdrop-blur-lg p-6 rounded-lg shadow-2xl z-10 border border-purple-500/30">
        <div className="relative mb-4">
          <SpectrumAnalyzer />
          <div className="relative z-10 text-white space-y-1">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Score: {gameState.score}
            </h2>
            <p className="text-purple-200">Position: {gameState.currentPosition + 1}/50</p>
            <p className="text-purple-200">Player: {gameState.playerName}</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded animate-pulse"></div>
            <span className="text-green-200">Easy (Move 1)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded animate-pulse"></div>
            <span className="text-yellow-200">Medium (Move 2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded animate-pulse"></div>
            <span className="text-red-200">Hard (Move 3)</span>
          </div>
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-10 gap-4 max-w-6xl mx-auto mt-20 perspective-1000">
        {Array.from({ length: TOTAL_BOXES }).map((_, index) => {
          const question = questions.find(q => q.id === index + 1);
          const isAnswered = question && gameState.answeredQuestions.includes(question.id);
          const isCurrentPosition = index === gameState.currentPosition;
          const isClickable = isCurrentPosition && question;

          return (
            <GameBox
              key={index}
              index={index}
              isCurrentPosition={isCurrentPosition}
              isAnswered={!!isAnswered}
              isClickable={!!isClickable}
              difficulty={getDifficulty(index)}
              onClick={() => handleBoxClick(index)}
            />
          );
        })}
      </div>

      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          onAnswer={(isCorrect) => {
            onAnswerQuestion(selectedQuestion.id, isCorrect);
            setSelectedQuestion(null);
          }}
        />
      )}
    </div>
  );
}