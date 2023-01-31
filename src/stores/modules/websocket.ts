import { defineStore } from 'pinia';
import { WebSocketChannel, CLIENT_EVENTS } from '@/events/ws';
import { useUserStore } from './user';
import { getAppEnvConfig } from '@/utils/env';
import { ref } from 'vue';

import { createLocalStorage } from '@/utils/cache';
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';

const chatCacheStorage = createLocalStorage({});

export interface chatRoomParams {
  chatId: number;
  type: number;
  contactId: number;
}

export const useWebSocketStore = defineStore('app-websocket', () => {
  const channel = ref<WebSocketChannel>();
  const userStore = useUserStore();
  const { VITE_WS_URL } = getAppEnvConfig();
  let onMsg: Function = () => {};
  const currentChatRoom = ref<chatRoomParams>(
    JSON.parse(chatCacheStorage.get(CACHE_KEYS.CHAT_ROOM)) || {
      chatId: 0,
      type: 0,
    },
  );

  function connectWebSocketService() {
    channel.value = new WebSocketChannel({
      url: VITE_WS_URL,
      protocols: [userStore.getToken],
    });

    if (channel.value) {
      channel.value.initWebSocket();
      channel.value.onPublicMsgListener = (res) => {
        if (res.event === CLIENT_EVENTS.RECEIVE_CHAT_MSG) {
          if (res.data?.chatId === currentChatRoom.value.chatId) {
            onMsg(res);
          } else {
            // 非当前房间的实时消息会收录到未读消息仓库中
          }
        }
      };
    }
  }

  function closeWebSocketService() {
    channel.value?.close();
  }

  function chatMsgListener(callback: Function) {
    onMsg = callback;
  }

  function setChatRoomParams(config: chatRoomParams) {
    currentChatRoom.value = config;
    chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, JSON.stringify(config));
  }

  function clearMsgListener() {
    currentChatRoom.value = {
      chatId: 0,
      type: 0,
      contactId: 0,
    };
    onMsg = () => {};
    chatCacheStorage.set(
      CACHE_KEYS.CHAT_ROOM,
      JSON.stringify({
        chatId: 0,
        type: 0,
        contactId: 0,
      }),
    );
  }

  return {
    connectWebSocketService,
    channel,
    closeWebSocketService,
    chatMsgListener,
    clearMsgListener,
    currentChatRoom,
    setChatRoomParams,
  };
});
