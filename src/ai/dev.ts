import { config } from 'dotenv';
config();

import '@/ai/flows/auto-grade-objective-questions.ts';
import '@/ai/flows/generate-exam-summary.ts';
import '@/ai/flows/flag-potentially-incorrect-answers.ts';
import '@/ai/flows/generate-practice-exam.ts';
