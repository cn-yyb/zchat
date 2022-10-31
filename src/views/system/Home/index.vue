<template>
  <div class="home-view">
    <!--  notice bar  -->
    <van-notice-bar mode="closeable">xxx 新功能已经推出！</van-notice-bar>
    <!-- search componet  -->
    <van-search
      input-align="center"
      placeholder="搜索"
      readonly
      @click-input="$router.push('/user-search')"
    />
    <!-- down refresh with chatlist-->
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
      <!-- <template #loosing> </template> -->
      <van-list
        v-model:loading="isLoading"
        v-model:error="isError"
        :finished="isFinished"
        finished-text="已经到底了 T_T"
        error-text="加载失败，请点击重试"
        @load="onLoad"
      >
        <van-swipe-cell v-for="item in chatList" :key="item" :title="item">
          <template #right>
            <van-button class="right-actions-btn" square type="danger" text="删除" />
            <van-button class="right-actions-btn" square type="primary" text="收藏" />
          </template>
          <van-cell :border="true">
            <template #title>
              <div class="left-container">
                <van-image
                  round
                  width="1.2rem"
                  height="1.2rem"
                  fit="cover"
                  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                  style="display: block"
                />
                <div class="user-simple-info">
                  <div class="user-nickname">吴彦祖</div>
                  <div class="new-msg">你食饭了没有啊？</div>
                </div>
              </div>
            </template>
            <template #value>
              <span class="date-info">
                {{ getCalendarDate() }}
              </span>
            </template>
          </van-cell>
        </van-swipe-cell>
      </van-list>
      <van-empty v-if="isEmpty" description="暂时没有新消息" />
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
  import { getCalendarDate } from '@/utils/calendarDate';
  import { ref } from 'vue';

  const chatList = ref<any[]>([]);
  const isLoading = ref(false);
  const isFinished = ref(false);
  const isError = ref(false);
  const isEmpty = ref(false);
  const refreshing = ref(false);

  const onLoad = () => {
    setTimeout(() => {
      if (refreshing.value) {
        chatList.value = [];
        refreshing.value = false;
      }

      for (let i = 0; i < 15; i++) {
        chatList.value.push(chatList.value.length + 1);
      }
      isLoading.value = false;

      if (chatList.value.length >= 60) {
        isFinished.value = true;
      }
    }, 1000);
  };

  const onRefresh = () => {
    // 清空列表数据
    isFinished.value = false;
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    isLoading.value = true;
    onLoad();
  };
</script>

<style lang="less" scoped>
  .home-view {
    padding-bottom: 50px;

    .left-container {
      display: flex;
      align-items: center;

      .user-simple-info {
        flex: 1;
        height: 100%;
        margin-left: 6px;
        .user-nickname {
          font-size: var(--van-font-size-lg);
          color: #222;
          font-weight: 500;
        }
        .new-msg {
          font-size: var(--van-font-size-sm);
          color: #999;
        }
      }
    }

    .right-actions-btn {
      height: 100%;
    }

    .date-info {
      font-size: var(--van-font-size-sm);
      color: #ccc;
    }
  }
</style>
