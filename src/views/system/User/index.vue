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
      <div class="action-list">
        <van-cell-group>
          <van-cell size="large" is-link to="/">
            <template #title>
              <Icon icon="iconoir:user" height="0.5rem" />&nbsp; 个人信息
            </template>
          </van-cell>
          <van-cell size="large" is-link to="/">
            <template #title>
              <Icon icon="iconoir:heart" height="0.5rem" />&nbsp; 我的收藏
            </template>
          </van-cell>
          <van-cell size="large" is-link to="/">
            <template #title>
              <Icon icon="iconoir:folder" height="0.5rem" />&nbsp; 我的文件
            </template>
          </van-cell>
          <van-cell size="large" title="主题设置" is-link to="/">
            <template #title>
              <Icon icon="iconoir:discord" height="0.5rem" />&nbsp; 主题设置
            </template>
          </van-cell>
          <van-cell size="large" title="退出登录" @click="handleLogout">
            <template #title>
              <Icon icon="iconoir:log-out" height="0.5rem" />&nbsp; 退出登录
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div class="bottom-tabbar">
      <div class="nav-item" @click="() => {}">
        <van-icon name="setting-o" class="nav-icon" />
        <div class="nav-title"> 设置 </div>
      </div>
      <div class="nav-item" @click="() => {}">
        <van-icon name="info-o" class="nav-icon" />
        <div class="nav-title"> 关于 </div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Icon from '@/components/Icon/index.vue';
  import { useUserStore } from '@/stores/modules/user';
  import { Dialog } from 'vant';

  const useStore = useUserStore();

  const isShow = ref(false);

  const showSettingPopup = () => (isShow.value = true);

  const handleLogout = () => {
    Dialog.confirm({
      title: '是否退出登录?',
      beforeClose: (action) =>
        new Promise((resolve) => {
          if (action === 'confirm') {
            setTimeout(() => {
              useStore.logout();
              resolve(true);
            }, 1000);
          } else {
            // 拦截取消操作
            resolve(true);
          }
        }),
    });
  };

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
    display: flex;
    flex-direction: column;
    height: calc(100% - 1.4rem);
    padding-bottom: 1.4rem;
    overflow: hidden;
    .user-base-info {
      display: flex;
      padding: 18px 0;
      border-radius: 6px;
      border: 1px solid rgb(0 0 0 / 8%);
      box-shadow: 0px 0px 8px 1px rgb(0 0 0 / 8%);
      .user-avatar {
        margin-left: 0.25rem;
        flex-shrink: 0;
        padding: 4px;
        border: 1px solid #eee;
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

    .action-list {
      flex: 1;
      overflow: auto;
      margin-top: 10px;
      border-radius: 6px;
      border: 1px solid rgb(0 0 0 / 8%);
      box-shadow: 0px 0px 8px 1px rgb(0 0 0 / 8%);
    }
  }

  .bottom-tabbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.4rem;
    display: flex;
    background-color: #fff;
    border-top: 1px solid #eee;
    .nav-item {
      box-sizing: border-box;
      width: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.5rem;
      user-select: none;
      cursor: pointer;
      .nav-icon {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .nav-title {
        font-weight: 500;
        font-size: 0.3rem;
      }

      &:active {
        background-color: #f2f3f5;
      }
    }
  }
</style>
