
'use server';
/**
 * @fileOverview Converts a PDF question paper into a structured JSON quiz format.
 *
 * - pdfToQuizJson - A function that handles the PDF to JSON conversion.
 * - PdfToQuizJsonInput - The input type for the function.
 * - PdfToQuizJsonOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import { GeneratedQuestionSchema } from '@/lib/types';
import {z} from 'genkit';

const PdfToQuizJsonInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file of a question paper, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type PdfToQuizJsonInput = z.infer<typeof PdfToQuizJsonInputSchema>;

const PdfToQuizJsonOutputSchema = z.object({
    questions: z.array(GeneratedQuestionSchema).describe('An array of structured exam questions extracted from the PDF.'),
});
export type PdfToQuizJsonOutput = z.infer<typeof PdfToQuizJsonOutputSchema>;

export async function pdfToQuizJson(input: PdfToQuizJsonInput): Promise<PdfToQuizJsonOutput> {
  return pdfToQuizJsonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToQuizJsonPrompt',
  input: {schema: PdfToQuizJsonInputSchema},
  output: {schema: PdfToQuizJsonOutputSchema},
  prompt: `You are an expert at parsing PDF documents and converting them into structured JSON data.

  You will be given a PDF document which is a question paper for a competitive exam. Your task is to analyze the PDF, extract every question, its type, options (if any), the correct answer, and assign points.

  Here are the rules for parsing:
  1.  **Question Extraction**: Identify and extract the full text of each question.
  2.  **Question Type**: Determine the type of each question. It must be one of 'multipleChoice', 'trueFalse', or 'freeText'.
  3.  **Options**: For 'multipleChoice' questions, extract all the possible options.
  4.  **Correct Answer**: Identify and extract the correct answer for each question. The correct answer is usually indicated in the PDF.
  5.  **Points**: Assign a 'pointsPossible' value for each question. Default to 10 points for objective questions ('multipleChoice', 'trueFalse') and 20 for 'freeText' questions, unless specified otherwise in the document.
  6.  **Unique ID**: Assign a unique 'questionId' for each question (e.g., "q1", "q2", "q3", ...).

  Here is the PDF to process: {{media url=pdfDataUri}}

  Convert the entire document into the specified JSON format containing an array of questions.
  `,
});

const pdfToQuizJsonFlow = ai.defineFlow(
  {
    name: 'pdfToQuizJsonFlow',
    inputSchema: PdfToQuizJsonInputSchema,
    outputSchema: PdfToQuizJsonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
