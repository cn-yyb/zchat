// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { WebSocketChannel } from '@/events/ws';
import { useUserStore } from './user';
import { getAppEnvConfig } from '@/utils/env';
import { ref } from 'vue';

export const useWebSocketStore = defineStore('app-websocket', () => {
  const channel = ref<WebSocketChannel>();
  const userStore = useUserStore();
  const { VITE_WS_URL } = getAppEnvConfig();

  function connectWebSocketService() {
    channel.value = new WebSocketChannel({
      url: VITE_WS_URL,
      protocols: [userStore.getToken],
    });

    channel.value?.initWebSocket();
  }

  function closeWebSocketService() {
    channel.value?.close();
  }

  return { connectWebSocketService, channel, closeWebSocketService };
});
