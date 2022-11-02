<template>
  <div class="private-chat-page">
    <div class="chat-record" ref="chatRef">
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
        <van-field
          size="large"
          v-model.trim="sendMsg"
          clearable
          autofocus
          @keydown.enter="handleSend"
        >
          <template #button>
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #be99ff, #7978ff)"
              style="width: 1.6rem"
              :disabled="!sendMsg"
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
  import { nextTick, onMounted, ref } from 'vue';
  import Icon from '@/components/Icon/index.vue';
  import { getChatMockData, type ChatRecordItem } from './mockData';

  const sendMsg = ref<string>('');
  const chatRecordList = ref<ChatRecordItem[]>([]);
  const chatRef = ref<HTMLDivElement | null>(null);
  chatRecordList.value = getChatMockData();

  const handleSend = () => {
    chatRecordList.value.push({
      nickname: 'xx',
      avatar: '',
      content: sendMsg.value,
      created_date: new Date().toLocaleTimeString(),
      isSelf: true,
      isEndTime: false,
    });
    sendMsg.value = '';
    nextTick(() => {
      chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
    });
  };

  onMounted(() => {
    chatRef.value!.scrollTop = chatRef.value!.scrollHeight;
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
          display: flex;
          align-items: center;
          padding: 6px;
          margin-left: 1.4133rem;
          border-radius: 4px;
          background-color: #7978ff;
          color: #fff;
          font-size: var(--van-font-size-md);
          word-break: break-all;
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
