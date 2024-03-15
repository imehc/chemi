import io from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
  query: {
    // 携带认证信息
  },
});

// https://socket.io/zh-CN/docs/v4/client-api/#event-error

socket.on('connect', () => {
  console.log('connected to the server');
});

socket.io.on('error', (error) => {
  console.log('connected fail: ', error);
});
