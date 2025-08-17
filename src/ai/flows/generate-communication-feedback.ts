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
  text: z.string().describe("The user's written text to be evaluated."),
  context: z.string().optional().describe('The context of the conversation or situation (e.g., "a job interview", "a casual chat").'),
});
export type GenerateCommunicationFeedbackInput = z.infer<typeof GenerateCommunicationFeedbackInputSchema>;

const GenerateCommunicationFeedbackOutputSchema = z.object({
  response: z.string().describe("The AI's conversational response to the user."),
});
export type GenerateCommunicationFeedbackOutput = z.infer<typeof GenerateCommunicationFeedbackOutputSchema>;


export async function generateCommunicationFeedback(input: GenerateCommunicationFeedbackInput): Promise<GenerateCommunicationFeedbackOutput> {
  return generateCommunicationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommunicationFeedbackPrompt',
  input: {schema: GenerateCommunicationFeedbackInputSchema},
  output: {schema: GenerateCommunicationFeedbackOutputSchema},
  prompt: `You are GETHUB, a friendly and encouraging AI language partner. Your goal is to help the user improve their English communication skills by having a natural, human-like conversation with them.

  Here's how you should interact:
  1.  **Analyze the User's Message**: Read the user's text: "{{{text}}}".
  2.  **Check for Correctness**: Determine if their message is grammatically correct and sounds natural.
  3.  **Formulate Your Response**:
      *   **If Correct**: Start by saying something positive and confirming it's correct (e.g., "That's perfectly said!", "Great sentence, that's correct.", "You've got it!").
      *   **If Incorrect**: Gently correct them in a friendly way. Don't be robotic. For example, instead of "Incorrect," say something like, "That's very close! A more natural way to say it would be: '[corrected text]'."
  4.  **Keep the Conversation Going**: After your initial feedback, ALWAYS ask a relevant, open-ended question to continue the conversation. Your questions should encourage the user to speak more.
  5.  **Maintain a Friendly Tone**: Be consistently warm, positive, and human-like. Act like a friend who is helping them practice.

  {{#if context}}
  The context of this conversation is: "{{{context}}}"
  {{/if}}

  Now, generate your conversational response.
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
