// import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { WebSocketChannel, CLIENT_EVENTS } from '@/events/ws';
import { useUserStore } from './user';
import { getAppEnvConfig } from '@/utils/env';
import { ref } from 'vue';

export const useWebSocketStore = defineStore('app-websocket', () => {
  const channel = ref<WebSocketChannel>();
  const userStore = useUserStore();
  const { VITE_WS_URL } = getAppEnvConfig();
  const contactId = ref(0);
  let onMsg: Function = () => {};

  function connectWebSocketService() {
    channel.value = new WebSocketChannel({
      url: VITE_WS_URL,
      protocols: [userStore.getToken],
    });

    if (channel.value) {
      channel.value.initWebSocket();
      channel.value.onPublicMsgListener = (res) => {
        if (res.event === CLIENT_EVENTS.RECEIVE_CHAT_MSG) {
          if (res.data?.contactId === contactId.value) {
            onMsg(res);
          }
        }
      };
    }
  }

  function closeWebSocketService() {
    channel.value?.close();
  }

  function chatMsgListener(_contactId: number, callback: Function) {
    contactId.value = _contactId;
    onMsg = callback;
  }

  return { connectWebSocketService, channel, closeWebSocketService, chatMsgListener };
});
