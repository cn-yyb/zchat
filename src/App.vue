<script setup lang="ts">
  import { Toast } from 'vant';

  Toast('hhhahahah');
</script>

<template>
  <div>
    <div class="test">Vue-Mobile-Start</div>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
  </div>
</template>

<style scoped>
  .test {
    font-size: 1rem;
    text-align: center;
  }
</style>
