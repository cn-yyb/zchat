<template>
  <div class="private-chat-page">
    <div class="chat-record" ref="chatRef">
      <div class="history-loading" v-if="isLoading || isEnd">
        <van-loading v-if="isLoading && !isEnd" size="0.5rem" />
        <span v-if="isEnd">已获取全部历史记录</span>
      </div>
      <template v-for="chatRecord of chatRecordList" :key="chatRecord.created_date">
        <div class="chat-record-item">
          <template v-if="chatRecord.isSelf">
            <div class="self-record">
              <div class="chat-record-content" v-html="chatRecord.content"> </div>
              <van-image
                round
                fit="cover"
                width="1rem"
                height="1rem"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                class="user-avatar"
              />
            </div>
            <template v-if="chatRecord.isEndTime">
              <div class="chat-date-divider">{{ chatRecord.created_date }}</div>
            </template>
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
              <div class="chat-record-content" v-html="chatRecord.content"></div>
            </div>

            <template v-if="chatRecord.isEndTime">
              <div class="chat-date-divider">{{ chatRecord.created_date }}</div>
            </template>
          </template>
        </div>
      </template>
    </div>
    <!-- <van-empty description="PrivateChat 模块未开发" /> -->
    <div class="send-area">
      <van-cell-group>
        <van-field v-model="sendMsg" size="large" clearable autofocus @keydown.enter="handleSend">
          <template #button>
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #be99ff, #7978ff)"
              style="width: 1.6rem"
              @click="handleSend"
            >
              <template #icon>
                <Icon icon="iconoir:send-diagonal" width="0.45rem" />
              </template>
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts" setup name="PrivateChat">
  import { nextTick, onMounted, onUnmounted, ref } from 'vue';
  import Icon from '@/components/Icon/index.vue';
  import { getChatMockData, type ChatRecordItem } from './mockData';
  import { toFormateUrls } from '@/utils/url';

  const sendMsg = ref<string>('');
  const chatRecordList = ref<ChatRecordItem[]>([]);
  const chatRef = ref<HTMLDivElement | null>(null);
  const isLoading = ref(false);
  const isEnd = ref(false);
  const valveRef = ref(true);

  const requestCount = ref(0);

  chatRecordList.value = getChatMockData();

  const handleSend = () => {
    console.log(sendMsg.value);
    chatRecordList.value.push({
      nickname: 'xx',
      avatar: '',
      content: toFormateUrls(sendMsg.value, undefined, 'word-break: break-all;'),
      created_date: new Date().toLocaleTimeString(),
      isSelf: true,
      isEndTime: false,
    });
    sendMsg.value = '';
    nextTick(() => {
      chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
    });
  };

  function chatRefSrcollEvent(e: Event) {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop === 0 && valveRef.value && !isEnd.value) {
      valveRef.value = false;
      isLoading.value = true;
      // 尝试获取历史数据...
      setTimeout(() => {
        chatRecordList.value = [...getChatMockData().slice(0, 5), ...chatRecordList.value];
        // 状态处理
        isLoading.value = false;

        requestCount.value++;
        requestCount.value === 4 && (isEnd.value = true);
        // 重新打开阀门
        valveRef.value = true;

        nextTick(() => {
          chatRef.value!.scrollTop = 0;
        });
      }, 2000);
    }
  }

  onMounted(() => {
    chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
    // 监听消息区域滚动事件
    chatRef.value?.addEventListener('scroll', chatRefSrcollEvent);
  });

  onUnmounted(() => {
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
    padding-top: var(--van-nav-bar-height);
    padding-bottom: 1.3333rem;
    background-color: @default-bgc;

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
        justify-content: end;
        padding: 8px;

        .user-avatar {
          flex-shrink: 0;
          display: block;
          visibility: middle;
          margin: 0 8px;
        }

        .chat-record-content {
          padding: 6px;
          margin-left: 1.4133rem;
          border-radius: 4px;
          background-color: #7978ff;
          color: #fff;
          font-size: var(--van-font-size-md);
          word-wrap: break-word;
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
          padding: 6px;
          margin-right: 1.4133rem;
          border-radius: 4px;
          background-color: #fff;
          color: #222;
          font-size: var(--van-font-size-md);
          word-wrap: break-word;
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
      :deep(.van-field__body) {
        background-color: @default-bgc;
        border-radius: var(--van-field-text-area-min-height);
      }
      :deep(.van-field__control) {
        padding-left: 0.4rem;
      }
    }
  }
</style>
