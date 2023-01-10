// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { WebSocketChannel } from '@/events/ws';

export const useWebSocketStore = defineStore('websocket', () => {
  let channel: WebSocketChannel | null = null;

  function connectWebSocket() {
    channel = new WebSocketChannel({
      url: 'ws://localhost:8001',
      protocols: [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNkcHpob25nIiwidWlkIjoiNDMzZmIyNzYtYzA0MC00YzVmLTk5MjQtN2ZiYjU1ZTM4NjNiIiwicm9sZSI6Mywic3RhdHVzIjowLCJpYXQiOjE2NzMyNDU1NzUsImV4cCI6MTY3MzI3NDM3NX0.64a4tYB7uHLUip_eebUHqJaUArguVgQ-3Ece0nao79o',
      ],
    });

    channel.initWebSocket();
  }

  return { connectWebSocket };
});
