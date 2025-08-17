'use server';
/**
 * @fileOverview Provides feedback on a user's written English communication.
 *
 * - generateCommunicationFeedback - A function that analyzes user text and provides feedback.
 * - GenerateCommunicationFeedbackInput - The input type for the function.
 * - GenerateCommunicationFeedbackOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCommunicationFeedbackInputSchema = z.object({
  text: z.string().describe('The user\'s written text to be evaluated.'),
  context: z.string().optional().describe('The context of the conversation or situation (e.g., "a job interview", "a casual chat").'),
});
export type GenerateCommunicationFeedbackInput = z.infer<typeof GenerateCommunicationFeedbackInputSchema>;

const GenerateCommunicationFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Constructive feedback on grammar, style, clarity, and tone.'),
  correctedText: z.string().describe('The user\'s text with corrections applied.'),
  suggestions: z.array(z.string()).describe('Specific suggestions for improvement.'),
});
export type GenerateCommunicationFeedbackOutput = z.infer<typeof GenerateCommunicationFeedbackOutputSchema>;


export async function generateCommunicationFeedback(input: GenerateCommunicationFeedbackInput): Promise<GenerateCommunicationFeedbackOutput> {
  return generateCommunicationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommunicationFeedbackPrompt',
  input: {schema: GenerateCommunicationFeedbackInputSchema},
  output: {schema: GenerateCommunicationFeedbackOutputSchema},
  prompt: `You are an expert English language coach. Your task is to provide constructive feedback on a user's written English.

  Analyze the following text:
  User Text: "{{{text}}}"
  {{#if context}}
  Context: "{{{context}}}"
  {{/if}}

  Please provide:
  1.  **Overall Feedback**: A summary of what the user did well and where they can improve. Comment on grammar, style, clarity, and tone.
  2.  **Corrected Text**: The original text with necessary corrections. If no corrections are needed, return the original text.
  3.  **Suggestions**: A list of 2-3 actionable suggestions for the user to improve their English communication skills based on this specific example.

  Be encouraging and supportive in your feedback.
  `,
});

const generateCommunicationFeedbackFlow = ai.defineFlow(
  {
    name: 'generateCommunicationFeedbackFlow',
    inputSchema: GenerateCommunicationFeedbackInputSchema,
    outputSchema: GenerateCommunicationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
