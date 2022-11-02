<template>
  <div class="user-status">
    <div class="user-avatar" :class="{ 'notice-dot': hasDot }" v-if="!isHiddenAvatar">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        fit="cover"
        position="center"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        style="display: block"
        @click="$emit('showSetting')"
      />
    </div>
    <div class="user-status-info" @click="$emit('setOnlineStatus')">
      <div class="user-nickname">{{ autoFix(userStatus.nickname) }}</div>
      <div class="user-online-status"><div class="status-dot"></div> {{ userStatus.status }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useTextOverFlow from '@/hooks/component/useTextOverFlow';
  import type { PropType } from 'vue';

  type UserStatus = {
    nickname: string;
    status: string;
  };

  defineProps({
    hasDot: {
      type: Boolean,
      default: false,
    },
    isHiddenAvatar: {
      type: Boolean,
      default: false,
    },
    userStatus: {
      type: Object as PropType<UserStatus>,
      default: () => ({
        nickname: '一隅北',
        status: '在线',
      }),
    },
  });

  defineEmits(['showSetting', 'setOnlineStatus']);

  const { autoFix } = useTextOverFlow(6);
</script>

<style lang="less" scoped>
  .user-status {
    display: flex;
    height: 1.2rem;
    align-items: center;
    transition: all 0.5s;
    .user-avatar {
      padding: 2px;
      background-color: #fff;
      border-radius: 50%;
      &.notice-dot::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background-color: #f74c32;
      }
    }
    .user-status-info {
      margin-left: 6px;
      color: #fff;
      .user-nickname {
        font-size: var(--van-font-size-md);
        height: auto;
      }
      .user-online-status {
        display: flex;
        align-items: center;

        font-size: var(--van-font-size-xs);
        line-height: var(--van-line-height-xs);
      }
      .status-dot {
        height: var(--van-font-size-xs);
        width: var(--van-font-size-xs);
        background-color: #24e58a;
        border-radius: 50%;
        margin: 0 4px;
      }
    }
  }
</style>
