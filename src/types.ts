export interface Question {
  id: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  correctAnswer: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface GameState {
  playerName: string;
  currentPosition: number;
  score: number;
  answeredQuestions: number[];
  currentQuestionId: number | null;
}