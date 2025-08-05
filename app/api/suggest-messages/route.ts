import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open ended and engaging questions formatted by a single string. These questions should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive questions, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?' Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await streamText({
      model: openai('gpt-4o'),
      prompt,
    });

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("An unexpected error occurred:", error);

    return NextResponse.json(
      {
        name: error?.name || "UnknownError",
        message: error?.message || "Something went wrong",
        stack: error?.stack,
      },
      { status: error?.status || 500 }
    );
  }
}
