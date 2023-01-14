<template>
  <van-config-provider :theme-vars="THEME_VARS" class="config-provider">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
  import { THEME_VARS } from '@/constants/modules/theme';
  import { WebSocketChannel, SERVER_EVENTS } from '@/events/ws';
  import { onMounted, onUnmounted } from 'vue';

  let channel: WebSocketChannel;

  onMounted(() => {
    channel = new WebSocketChannel({
      url: 'ws://localhost:8001',
      protocols: [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNkcHpob25nIiwidWlkIjoiNDMzZmIyNzYtYzA0MC00YzVmLTk5MjQtN2ZiYjU1ZTM4NjNiIiwicm9sZSI6Mywic3RhdHVzIjowLCJpYXQiOjE2NzMyNDU1NzUsImV4cCI6MTY3MzI3NDM3NX0.64a4tYB7uHLUip_eebUHqJaUArguVgQ-3Ece0nao79o',
      ],
    });
    channel.initWebSocket();

    channel.sendMsg({
      event: SERVER_EVENTS.PING,
      data: null,
    });
  });

  onMounted(() => {
    const winh = document.body.clientHeight;
    window.localStorage.setItem('curwinh', winh + '');

    window.onresize = function () {
      const newh = window.localStorage.getItem('curwinh');
      document.getElementById('app')!.style.height = newh + 'px';
    };
  });

  onUnmounted(() => {
    channel.close();
  });
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;
    width: 100%;
  }
</style>
