<template>
  <div class="private-chat-page">
    <!-- chatrom page header -->
    <chat-rom-page-header />
    <div class="chat-record" ref="chatRef">
      <div class="history-loading" v-if="isLoading || isEnd">
        <van-loading v-if="isLoading && !isEnd" size="0.5rem" />
        <span v-if="isEnd">已获取全部聊天记录</span>
      </div>
      <template v-for="chatRecord of _chatRecordList" :key="chatRecord.created_date">
        <div class="chat-record-item">
          <template v-if="chatRecord.isSelf">
            <div class="self-record">
              <div class="chat-record-content"><span v-html="chatRecord.content"></span></div>
              <van-image
                round
                fit="cover"
                width="1rem"
                height="1rem"
                :src="userStore.getUserInfo?.avatar"
                class="user-avatar"
              />
            </div>
            <!-- <template v-if="chatRecord.isEndTime">
              <div class="chat-date-divider">{{ chatRecord.createdAt }}</div>
            </template> -->
          </template>
          <template v-else>
            <div class="other-record">
              <van-image
                round
                fit="cover"
                width="1rem"
                height="1rem"
                :src="chatRecord.avatar"
                class="user-avatar"
              />
              <div class="chat-record-content"><span v-html="chatRecord.content"></span></div>
            </div>

            <!-- <template v-if="chatRecord.isEndTime">
              <div class="chat-date-divider">{{ chatRecord.createdAt }}</div>
            </template> -->
          </template>
        </div>
      </template>
    </div>
    <div class="send-area">
      <van-cell-group>
        <van-field ref="sendInputRef" v-model.trim="sendMsg" type="textarea" rows="1" autosize>
          <template #button>
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #be99ff, #7978ff)"
              style="width: 1.6rem"
              @click="handleSend"
            >
              <template #icon>
                <v-icon icon="iconoir:send-diagonal" width="0.45rem" />
              </template>
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts" setup name="PrivateChat">
  import { nextTick, onBeforeUnmount, onMounted, onDeactivated, ref } from 'vue';
  import { toFormateUrls } from '@/utils/url';
  import type { FieldInstance } from 'vant';
  import ChatRomPageHeader from './components/ChatRomPageHeader.vue';
  import { useWebSocketStore } from '@/stores/modules/websocket';
  import { SERVER_EVENTS, type WSMsgType } from '@/events/ws';
  import dayjs from 'dayjs';
  import { useUserStore } from '@/stores/modules/user';
  import type { ChatRecordForm, ChatRecordItem as _ChatRecordItem } from '@/api/modules/types/chat';
  import { getChatRecord } from '@/api/modules/chat';

  interface chatRecordResItem {
    avatar: string;
    nickName: string;
    accountName: string;
    gender: number;
    uid: string;
    msg: string;
    chatId: number;
    contactId: number;
    msgType: number;
    status: number;
    msgId: number;
    senderId: string;
    receiverId: string;
    content: string;
    updatedAt: string;
    createdAt: string;
  }

  const websocketStore = useWebSocketStore();
  const userStore = useUserStore();

  websocketStore.chatMsgListener((res: WSMsgType<chatRecordResItem>) => {
    console.log(res.data);
    const {
      msgId,
      senderId,
      receiverId,
      chatId,
      msgType,
      content,
      status,
      createdAt,
      updatedAt,
      avatar,
      nickName,
      accountName,
    } = res.data;
    _chatRecordList.value.push({
      nickname: nickName || accountName || '_',
      msgId,
      senderId,
      receiverId,
      chatId,
      msgType,
      content: toFormateUrls(content, undefined, 'word-break: break-all;'),
      status,
      createdAt: dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
      isSelf: senderId === userStore.getUserInfo?.uid,
      avatar,
      // isEndTime: false,
    });
    nextTick(() => {
      chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
    });
  });

  onDeactivated(() => {
    websocketStore.clearMsgListener();
  });

  const sendInputRef = ref<FieldInstance | null>(null);
  const sendMsg = ref<string>('');
  const _chatRecordList = ref<_ChatRecordItem[]>([]);
  const chatRef = ref<HTMLDivElement | null>(null);
  const isLoading = ref(false);
  const isEnd = ref(false);
  const valveRef = ref(true);

  const requestListParams = ref<ChatRecordForm>({
    chatId: websocketStore.currentChatRoom.chatId!,
    current: 1,
    pageSize: 20,
  });

  // chatRecordList.value = getChatMockData();

  async function requestChatRecord() {
    isLoading.value = true;
    try {
      const { data, pages, current } = await getChatRecord(requestListParams.value);

      if (pages === current) {
        isEnd.value = true;
      }
      _chatRecordList.value = [...data, ..._chatRecordList.value];
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-empty
    } finally {
      setTimeout(() => {
        // 状态处理
        isLoading.value = false;
      }, 1000);
    }
  }

  async function initChatRecord() {
    await requestChatRecord();
    await nextTick();
    chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
  }
  initChatRecord();

  const handleSend = () => {
    if (!sendMsg.value) {
      return;
    }
    websocketStore.channel?.sendMsg({
      event: SERVER_EVENTS.SEND_CHAT_MSG,
      data: {
        contactId: websocketStore.currentChatRoom.contactId,
        msg: sendMsg.value,
      },
    });

    sendMsg.value = '';
    nextTick(() => {
      chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
      sendInputRef.value?.focus();
    });
  };

  function chatRefSrcollEvent(e: Event) {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop === 0 && valveRef.value && !isEnd.value) {
      valveRef.value = false;
      isLoading.value = true;
      // 尝试获取历史数据...
      setTimeout(async () => {
        await requestChatRecord();
        requestListParams.value.current!++;

        // 重新打开阀门
        valveRef.value = true;

        await nextTick(() => {
          chatRef.value!.scrollTop = 0;
        });
      }, 1000);
    }
  }

  onMounted(() => {
    chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
    // 监听消息区域滚动事件
    chatRef.value?.addEventListener('scroll', chatRefSrcollEvent);
  });

  onBeforeUnmount(() => {
    websocketStore.clearMsgListener();
    chatRef.value?.removeEventListener('scroll', chatRefSrcollEvent);
  });
</script>

<style lang="less" scoped>
  @default-bgc: #f5f5f5;
  .private-chat-page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: 1.3333rem;

    background-color: @default-bgc;
    // background-image: url(http://192.168.1.3/openfs/2022/picture/t9cP2em1AM7hpFjXU2sNs.jpg);
    // background-repeat: no-repeat;
    // background-position: center;
    // background-attachment: fixed;
    // background-size: cover;

    .chat-record {
      flex: 1;
      overflow-y: auto;

      .history-loading {
        margin: 8px 0;
        text-align: center;
        font-size: var(--van-font-size-xs);
        color: #999;
        height: 0.5rem;
      }

      .self-record {
        display: flex;
        justify-content: flex-end;
        padding: 8px;

        .user-avatar {
          flex-shrink: 0;
          display: block;
          visibility: middle;
          margin: 0 8px;
        }

        .chat-record-content {
          display: flex;
          align-items: center;
          padding: 6px;
          margin-left: 1.4133rem;
          border-radius: 4px;
          background-color: #7978ff;
          color: #fff;
          font-size: var(--van-font-size-md);
          word-break: break-all;
          white-space: pre-wrap;
        }
      }

      .other-record {
        display: flex;
        padding: 8px;
        .user-avatar {
          flex-shrink: 0;
          display: block;
          visibility: middle;
          margin: 0 8px;
        }

        .chat-record-content {
          display: flex;
          align-items: center;
          padding: 6px;
          margin-right: 1.4133rem;
          border-radius: 4px;
          background-color: #fff;
          color: #222;
          font-size: var(--van-font-size-md);
          word-break: break-all;
          white-space: pre-wrap;
        }
      }

      .chat-date-divider {
        padding: 4px 0;
        text-align: center;
        color: #999;
        font-size: var(--van-font-size-sm);
      }
    }

    .send-area {
      background-color: #fff;
      flex-shrink: 0;
      :deep(.van-field__control) {
        border-radius: 4px;
        padding-left: 0.4rem;
        line-height: 0.88rem;
        min-height: 0.88rem;
        max-height: 1.6rem;
        background-color: @default-bgc;
      }
      :deep(.van-field__button) {
        align-self: flex-end;
      }
    }
  }
</style>
