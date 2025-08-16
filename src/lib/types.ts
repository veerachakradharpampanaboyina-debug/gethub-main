import type {
  AutoGradeObjectiveQuestionsOutput,
} from '@/ai/flows/auto-grade-objective-questions';
import type {
  FlagPotentiallyIncorrectAnswersOutput,
} from '@/ai/flows/flag-potentially-incorrect-answers';
import type { z } from 'genkit';
import type { GeneratedQuestionSchema } from '@/ai/flows/generate-practice-exam';


export interface Student {
  name: string;
  id: string;
  avatarUrl?: string;
}

export type QuestionType =
  | 'multipleChoice'
  | 'trueFalse'
  | 'matching'
  | 'freeText';

export interface Question extends z.infer<typeof GeneratedQuestionSchema> {
  studentAnswer: string;
  options?: string[]; // Ensure options is part of the final Question type
}


export interface Exam {
  student: Student;
  examName: string;
  examId: string;
  questions: Question[];
}

export type GradingResult = AutoGradeObjectiveQuestionsOutput['results'][0];

export type FlaggedAnswer = {
  questionId: string;
} & FlagPotentiallyIncorrectAnswersOutput;

export interface AIGradingState {
  objectiveResults: GradingResult[];
  flaggedAnswers: FlaggedAnswer[];
  summary: string;
  totalPointsAwarded: number;
  totalPointsPossible: number;
}
