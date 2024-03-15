'use client';

import { useEffect } from 'react';
import { socket } from '~/tools';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';

type Message = {
  id: string;
  payload: string;
};

export default function Home() {
  const { messages, appendMsg, setTyping } = useMessages([]);

  useEffect(() => {
    socket.on('message', (data: Message) => {
      appendMsg({
        type: 'text',
        content: { text: data.payload },
        position: socket.id === data.id ? 'right' : 'left',
        user: { name: data.id },
        hasTime: true,
      });
    });

    return () => {
      socket.off('message');
    };
  }, [appendMsg]);

  return (
    <Chat
      navbar={{ title: '测试socker.io' }}
      messages={messages}
      renderMessageContent={({ content }) => <Bubble content={content.text} />}
      onSend={(type, val) => {
        if (type === 'text' && val.trim()) {
          socket.emit('message', val);
          setTyping(true);
        }
      }}
    />
  );
}
