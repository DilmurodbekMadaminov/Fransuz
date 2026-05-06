import { Question } from '../types';
import { questionsPart1 } from './questions1';
import { questionsPart2 } from './questions2';

export const allQuestions: Question[] = [...questionsPart1, ...questionsPart2];

function shuffleQuestion(q: Question): Question {
  const options = [...q.options];
  // Since we set correctAnswer: 0 for all generated questions, we can safely find the correct text
  const correctOptionText = options[q.correctAnswer];
  
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    ...q,
    options,
    correctAnswer: options.indexOf(correctOptionText)
  };
}

export const getQuestionsByVariant = (variant: number): Question[] => {
  const start = (variant - 1) * 25;
  const chunk = allQuestions.slice(start, start + 25);
  return chunk.map(q => shuffleQuestion(q));
};

export const getVariantLength = (variant: number): number => {
  const start = (variant - 1) * 25;
  return allQuestions.slice(start, start + 25).length;
};

export const totalVariants = Math.ceil(allQuestions.length / 25);
