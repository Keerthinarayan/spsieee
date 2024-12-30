import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { WinnerModal } from './components/WinnerModal';
import { GameState } from './types';
import { questions } from './data/questions';
import { saveProgress, loadProgress, clearProgress } from './utils/storage';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(() => {
    const saved = loadProgress();
    return saved?.playerName ? saved : null;
  });
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    if (gameState) {
      saveProgress(gameState);
    }
  }, [gameState]);

  const handleStart = (playerName: string) => {
    clearProgress();
    setGameState({
      playerName,
      currentPosition: 0,
      score: 0,
      answeredQuestions: [],
      currentQuestionId: null
    });
    setShowWinner(false);
  };

  const handleAnswerQuestion = (questionId: number, isCorrect: boolean) => {
    if (!gameState) return;

    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    if (!isCorrect) {
      setGameState(prev => ({
        ...prev!,
        currentQuestionId: questionId
      }));
      return;
    }

    const moveSteps = {
      easy: 1,
      medium: 2,
      hard: 3,
    }[question.difficulty];

    setGameState(prev => {
      if (!prev) return prev;
      const newPosition = prev.currentPosition + moveSteps;
      const newScore = prev.score + moveSteps;
      
      if (newPosition >= 50) {
        setTimeout(() => setShowWinner(true), 500);
      }

      return {
        ...prev,
        score: newScore,
        currentPosition: newPosition,
        answeredQuestions: [...prev.answeredQuestions, questionId],
        currentQuestionId: null
      };
    });
  };

  if (!gameState) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <>
      <GameBoard
        gameState={gameState}
        questions={questions}
        onAnswerQuestion={handleAnswerQuestion}
      />
      {showWinner && (
        <WinnerModal
          playerName={gameState.playerName}
          score={gameState.score}
          onRestart={() => handleStart(gameState.playerName)}
        />
      )}
    </>
  );
}

export default App;