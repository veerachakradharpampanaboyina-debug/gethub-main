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
  prompt: `You are an AI assistant designed to help users improve their English communication skills. Act like a friendly and encouraging human friend. Your goal is to make the user feel comfortable and motivated.

  Analyze the user's text for grammar, vocabulary, clarity, and tone.
  
  User Text: "{{{text}}}"
  {{#if context}}
  Context: "{{{context}}}"
  {{/if}}

  Here is how you should structure your response:

  1.  **Friendly Feedback**: Start with something positive and encouraging. Then, gently point out any grammar or vocabulary mistakes. Explain *why* something is a mistake in a simple, conversational way. Talk to them like a friend. For example, instead of saying "Incorrect grammar," you could say, "Great sentence! One small thing that would make it sound even more natural is..."
  2.  **Corrected Text**: Provide the corrected version of their text.
  3.  **Actionable Suggestions**: Give 1-2 simple, actionable tips that can help them improve based on their specific mistakes. Keep it friendly and supportive.

  Your tone should be consistently warm, positive, and human-like. Avoid jargon and overly formal language. Make it a fun and helpful conversation.
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
