<template>
  <div class="friend-list">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-index-bar :sticky="false">
        <template v-for="item of renderItems" :key="item">
          <van-index-anchor :index="item" />
          <van-cell v-for="itemText of 6" :title="`${item}-${itemText}`" :key="itemText" />
        </template>
      </van-index-bar>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
  import { Toast } from 'vant';
  import { ref } from 'vue';

  const renderItems = Array(26)
    .fill(undefined)
    .map((_v, i) => String.fromCharCode(i + 65));

  const loading = ref(false);

  const onRefresh = () => {
    setTimeout(() => {
      Toast('刷新成功');
      loading.value = false;
    }, 1000);
  };
</script>

<style lang="less" scoped>
  .friend-list {
    // background-color: #eee;
  }
</style>
