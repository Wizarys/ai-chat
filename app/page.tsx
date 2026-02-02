'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/Textarea';

export default function Chat() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { messages, sendMessage } = useChat({
    onFinish: () => {
      scrollToBottom();
    },
  });

  const submitMessage = () => {
    sendMessage({ text: input });
    setInput('');
  };

  type ChatMessage = (typeof messages)[number];
  type Turn = { user: ChatMessage | null; assistant: ChatMessage | null };

  const turns: Turn[] = [];

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];

    if (message.role === 'user') {
      const nextMessage = messages[i + 1];

      if (nextMessage && nextMessage.role === 'assistant') {
        turns.push({ user: message, assistant: nextMessage });
        i++;
      } else {
        turns.push({ user: message, assistant: null });
      }

      continue;
    }

    if (message.role === 'assistant') {
      turns.push({ user: null, assistant: message });
    }
  }

  // TODO separate message in own component

  const renderMessage = (message: ChatMessage) => {
    return message.parts.map((part: ChatMessage['parts'][number], i: number) => {
      switch (part.type) {
        case 'text':
          return <div key={`${message.id}-${i}`}>{part.text}</div>;
        default:
          return null;
      }
    });
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {turns.map(turn => (
        <div
          key={`${turn.user?.id ?? 'user'}-${turn.assistant?.id ?? 'assistant'}`}
          className="border-b border-zinc-200 dark:border-zinc-800 py-4 space-y-2 last:border-b-0"
        >
          {turn.user ? (
            <div className="whitespace-pre-wrap">
              <b>User:</b>
              {renderMessage(turn.user)}
            </div>
          ) : null}

          {turn.assistant ? (
            <div className="whitespace-pre-wrap">
              <b>AI:</b>
              {renderMessage(turn.assistant)}
            </div>
          ) : null}
        </div>
      ))}

      <div ref={messagesEndRef} />

      <form
        onSubmit={e => {
          e.preventDefault();
          submitMessage();
        }}
      >
        <Textarea
          className="fixed bg-white dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
          onKeyDown={e => {
            if (e.key !== 'Enter' || e.shiftKey) return;
            e.preventDefault();
            submitMessage();
          }}
        />
      </form>
    </div>
  );
}