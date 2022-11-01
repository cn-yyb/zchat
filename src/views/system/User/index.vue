<template>
  <van-popup
    v-model:show="isShow"
    closeable
    round
    position="left"
    :style="{ width: '85%', height: '100%' }"
  >
    <div class="user-setting">
      <div class="user-base-info">
        <van-image
          round
          fit="cover"
          width="1.5rem"
          height="1.5rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          class="user-avatar"
        />
        <div class="user-bio-info">
          <div class="user-nickname">一隅北 <van-icon name="medal-o" /></div>
          <div class="user-bio">
            <Icon icon="carbon:edit" />
            长路漫漫，唯剑作伴。</div
          >
        </div>
      </div>
      <div class="action-list"></div>
    </div>
    <div class="bottom-tabbar"></div>
  </van-popup>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Icon from '@/components/Icon/index.vue';

  const isShow = ref(true);

  const showSettingPopup = () => (isShow.value = true);

  defineExpose({
    showSettingPopup,
  });
</script>

<style lang="less" scoped>
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-setting {
    margin-top: 1.2rem;
    padding: 0.2rem;
    background-color: #eee;
    .user-base-info {
      display: flex;
      .user-avatar {
        flex-shrink: 0;
      }

      .user-bio-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-left: 10px;
        .user-nickname {
          font-size: 0.45rem;
          color: #222;
          font-weight: 500;
          flex: 1;
          flex-shrink: 0;

          .text-overflow();
        }

        .user-bio {
          font-size: 0.4rem;

          .text-overflow();
        }
      }
    }
  }
</style>
