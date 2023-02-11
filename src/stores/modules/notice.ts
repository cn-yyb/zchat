/*
 * @Author: zq
 * @Date: 2023-02-04 09:50:13
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-09 14:32:35
 * @Desc: 接收并处理实时消息 & 未读 & 通知消息
 */
import { defineStore } from 'pinia';
import { ChatRoomTypeEnum } from '@/constants/enums/chatEnum';
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import type { WSMsgType } from '@/events/ws';
import { useUserStore } from './user';
import { getChatRoomInfo, getUnreadChatReocrd } from '@/api/modules/chat';

const chatCacheStorage = createLocalStorage({});

export interface NoticeState {
  currentChatRoom: ChatRoomTypes;
  onMsgCallback: listenerCb;
  unreadChatReordCache: any[];
  chatRecordList: ChatRecordListItem[];
}

export const useNoticeStore = defineStore({
  id: 'app-notice',
  state: (): NoticeState => ({
    currentChatRoom: chatCacheStorage.get(CACHE_KEYS.CHAT_ROOM) || {
      chatId: 0,
      contactId: 0,
      type: ChatRoomTypeEnum.PRIVATE,
      chatRoomName: '',
    },
    onMsgCallback: () => {},
    unreadChatReordCache: [],
    chatRecordList: chatCacheStorage.get(CACHE_KEYS.CHAT_RECORD_LIST) || [],
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
      chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, {
        chatId: 0,
        type: ChatRoomTypeEnum.PRIVATE,
        contactId: 0,
        chatRoomName: '',
      });
    },
    setMsgListenerConfig(chatRoomInfo: ChatRoomTypes) {
      this.currentChatRoom = chatRoomInfo;
      chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, chatRoomInfo);
    },
    async createChatListItem(chatRecord: chatRecordResItem) {
      const { createdAt, user, chatId, content, type } = chatRecord;
      const record = this.chatRecordList.find((v) => v.chatId === chatId);
      const isRead = chatId === this.currentChatRoom.chatId;

      if (record) {
        record.total++;
        record.time = createdAt;
        record.isRead = isRead;
        record.user = user;
        record.lastMsg = content;
      } else {
        const chatRoom = await getChatRoomInfo({ chatId });
        this.chatRecordList.push({
          chatId,
          lastMsg: content,
          total: 1,
          time: createdAt,
          isRead,
          user,
          type,
          chatRoom,
        });
      }
      console.log(this.chatRecordList);
      this.syncChatRecordCache();
    },
    // 首次登录成功后，同步离线未读消息
    async syncUnreadChatRecord() {
      try {
        const { record, total } = await getUnreadChatReocrd();
        console.log(record, total);

        record.forEach(async (item) => {
          const {
            unreadCount,
            user,
            lastMsg: { content, createdAt, chatId, receiverId },
          } = item;
          const _chatRecord = this.chatRecordList.find((v) => v.chatId === chatId);
          const type = receiverId ? 0 : 1;
          if (_chatRecord) {
            _chatRecord.lastMsg = content;
            _chatRecord.total = unreadCount;
            _chatRecord.time = createdAt;
            _chatRecord.isRead = false;
            _chatRecord.user = user;
          } else {
            const chatRoom = await getChatRoomInfo({ chatId });
            this.chatRecordList.push({
              chatId,
              lastMsg: content,
              total: unreadCount,
              time: createdAt,
              isRead: false,
              user,
              type,
              chatRoom,
            });
          }
        });

        console.log(this.chatRecordList);
        //save
        this.syncChatRecordCache();
      } catch (error) {
        console.log(error);
      }
    },
    // 移除某一联系人的未读记录和状态
    removeUnreadStatus(chatId: number) {
      const removeItem = this.chatRecordList.find((item) => (item.chatId = chatId));
      if (removeItem) {
        removeItem.isRead = true;
        removeItem.total = 0;
      }
      this.syncChatRecordCache();
    },
    // 用户手动移除某个记录
    removeOneChatRecord(chatId: number) {
      const index = this.chatRecordList.findIndex((v) => v.chatId === chatId);
      if (index > -1) {
        this.chatRecordList.splice(index, 1);
      }
      this.syncChatRecordCache();
    },
    syncChatRecordCache() {
      //save
      chatCacheStorage.set(CACHE_KEYS.CHAT_RECORD_LIST, this.chatRecordList);
    },
  },
});
