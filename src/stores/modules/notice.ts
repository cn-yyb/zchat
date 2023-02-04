/*
 * @Author: zq
 * @Date: 2023-02-04 09:50:13
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-04 14:41:21
 * @Desc: 接收并处理实时消息 & 未读 & 通知消息
 */
import { defineStore } from 'pinia';
import { ChatRoomTypeEnum } from '@/constants/enums/chatEnum';
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import type { WSMsgType } from '@/events/ws';

const chatCacheStorage = createLocalStorage({});

type listenerCb<T = any> = (res?: WSMsgType<T>) => void;

export interface ChatRoomTypes {
  chatId: number;
  type: number;
  chatRoomName?: string;
  contactId: number;
  userStatus: number;
  isOnline: boolean;
  [x: string]: any;
}

export interface NoticeState {
  currentChatRoom: ChatRoomTypes;
  onMsgCallback: listenerCb;
  unreadChatReordCache: any[];
}

export const useNoticeStore = defineStore({
  id: 'app-notice',
  state: (): NoticeState => ({
    currentChatRoom: JSON.parse(chatCacheStorage.get(CACHE_KEYS.CHAT_ROOM)) || {
      chatId: 0,
      contactId: 0,
      type: ChatRoomTypeEnum.PRIVATE,
      chatRoomName: '',
    },
    onMsgCallback: () => {},
    unreadChatReordCache: [],
  }),
  getters: {
    unreadRocordTotal(): number {
      return this.unreadChatReordCache.length;
    },
  },
  actions: {
    setMsgListener(callback: listenerCb) {
      this.onMsgCallback = callback;
    },
    handleOnlineChatRecord(res: WSMsgType<any>) {
      if (res.data?.chatId === this.currentChatRoom.chatId) {
        this.onMsgCallback(res);
      } else {
        // 非当前房间的实时消息会收录到未读消息仓库中
        this.unreadChatReordCache.push(res.data);
      }
    },
    clearMsgListener() {
      this.currentChatRoom.value = {
        chatId: 0,
        type: ChatRoomTypeEnum.PRIVATE,
        contactId: 0,
        chatRoomName: '',
      };
      this.onMsgCallback = () => {};
      chatCacheStorage.set(
        CACHE_KEYS.CHAT_ROOM,
        JSON.stringify({
          chatId: 0,
          type: ChatRoomTypeEnum.PRIVATE,
          contactId: 0,
          chatRoomName: '',
        }),
      );
    },
    setMsgListenerConfig(chatRoomInfo: ChatRoomTypes) {
      console.log(chatRoomInfo);
      this.currentChatRoom = chatRoomInfo;
      chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, JSON.stringify(chatRoomInfo));
    },
  },
});
