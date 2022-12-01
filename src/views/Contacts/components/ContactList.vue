<template>
  <div class="contact-list">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-index-bar :sticky="false">
        <template v-for="item of renderItems" :key="item">
          <van-index-anchor :index="item" />
          <!-- <van-cell v-for="itemText of 6" :title="`${item}-${itemText}`" :key="itemText" /> -->
          <van-cell border clickable v-for="userItem in 4" :key="userItem">
            <template #title>
              <div class="left-container">
                <van-image
                  round
                  width="1.2rem"
                  height="1.2rem"
                  fit="cover"
                  :src="AvatarImage"
                  class="user-avatar"
                  :class="{ 'deactive-status': userItem % 3 === 0 }"
                />
                <div class="user-simple-info">
                  <div class="user-nickname">{{ '陌上花开' }}</div>
                  <div class="new-msg">{{
                    `[${userItem % 3 === 0 ? '离线' : '在线'}]` + ' 长路漫漫, 唯剑作伴'
                  }}</div>
                </div>
              </div>
            </template>
          </van-cell>
        </template>
      </van-index-bar>
    </van-pull-refresh>
    <van-empty v-if="false" image-size="70" description="真可怜, 您还没有一个好友" />
  </div>
</template>

<script lang="ts" setup>
  import { Toast } from 'vant';
  import { ref } from 'vue';
  import AvatarImage from '@/assets/images/avatar.jpg';

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
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contact-list {
    // background-color: #eee;
  }

  .left-container {
    display: flex;
    align-items: center;
    .user-avatar {
      // display: block;
      padding: 2px;
      flex-shrink: 0;
      // box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
    }

    .user-simple-info {
      flex: 1;
      height: 100%;
      margin-left: 6px;
      overflow: hidden;
      .user-nickname {
        font-size: var(--van-font-size-lg);
        color: #222;
        font-weight: 500;
        .text-overflow();
      }
      .new-msg {
        font-size: var(--van-font-size-sm);
        color: #999;
        .text-overflow();
      }
    }
  }

  .deactive-status {
    -webkit-filter: grayscale(80%);
    filter: grayscale(80%);
  }

  :deep(.van-collapse-item__content) {
    padding: 0;
  }

  :deep(.van-cell__value) {
    flex: none;
    margin-left: 10px;
  }

  :deep(.van-cell__title) {
    overflow: hidden;
  }
</style>
