import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { openrouter } from '@/app/providers/OpenRouterProvider';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter.chat('stepfun/step-3.5-flash:free'),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}