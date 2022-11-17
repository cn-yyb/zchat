<template>
  <div class="friend-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <template v-for="item of renderItems" :key="item">
        <van-cell>
          <template #title>
            <span style="font-size: 16px; font-weight: 500">{{ item }}</span>
          </template>
        </van-cell>
        <van-cell v-for="value in 6" :key="value" :title="item + '-' + value" />
      </template>
    </van-list>
  </div>
  <div class="index-bar-nav">
    <div class="inner">
      <span class="index-bar-nav-item" v-for="navItem of renderItems" :key="navItem">{{
        navItem
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const renderItems = Array(26)
    .fill(undefined)
    .map((_v, i) => String.fromCharCode(i + 65));

  const list = ref<number[]>([]);
  const loading = ref(false);
  const finished = ref(false);

  const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        list.value.push(list.value.length + 1);
      }

      // 加载状态结束
      loading.value = false;

      // 数据全部加载完成
      if (list.value.length >= 40) {
        finished.value = true;
      }
    }, 1000);
  };
</script>

<style lang="less" scoped>
  .friend-list {
    // background-color: #eee;
    position: relative;
  }

  .index-bar-nav {
    // background-color: red;
    position: fixed;
    right: 0.3rem;
    top: 2.6rem;
    // bottom: 0;
    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 500px;
      .index-bar-nav-item {
        flex: 1;
        padding: 0 2px;
      }
    }
  }
</style>
