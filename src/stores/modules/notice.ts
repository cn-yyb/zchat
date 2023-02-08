/*
 * @Author: zq
 * @Date: 2023-02-04 09:50:13
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-06 15:14:21
 * @Desc: 接收并处理实时消息 & 未读 & 通知消息
 */
import { defineStore } from 'pinia';
import { ChatRoomTypeEnum } from '@/constants/enums/chatEnum';
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import type { WSMsgType } from '@/events/ws';
import { useUserStore } from './user';

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
  chatRecordList: any[];
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
    chatRecordList: [],
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
    handleOnlineChatRecord(res: WSMsgType<chatRecordResItem>) {
      const userStore = useUserStore();
      if (res.data?.chatId === this.currentChatRoom.chatId) {
        this.onMsgCallback(res);
      } else {
        // 非当前房间的实时消息会收录到未读消息仓库中
        this.unreadChatReordCache.push(res.data);
      }
      // 生成会话记录
      if (userStore.getUserInfo?.uid !== res.data?.senderId) {
        this.createChatListItem(res.data);
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
      this.currentChatRoom = chatRoomInfo;
      chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, JSON.stringify(chatRoomInfo));
    },
    createChatListItem(chatRecord: chatRecordResItem) {
      const { senderId } = chatRecord;
      const record = this.chatRecordList.find((v) => v.senderId === senderId);
      if (record) {
        record.msg = chatRecord.content;
        record.count++;
        record.time = chatRecord.createdAt;
        record.isRead = chatRecord?.chatId === this.currentChatRoom.chatId;
      } else {
        this.chatRecordList.push({
          senderId,
          msg: chatRecord.content,
          count: 1,
          time: chatRecord.createdAt,
          isRead: chatRecord?.chatId === this.currentChatRoom.chatId,
        });
      }
      console.log(this.chatRecordList);
    },
  },
});
