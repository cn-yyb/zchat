<template>
  <div class="contacts-page">
    1221
    <!-- <van-tabs v-model:active="active" sticky offset-top="1.22667rem" :color="PRIMARY_COLOR">
      <van-tab title="好友" name="friend-list">
        <friend-list />
      </van-tab>
      <van-tab title="分组" name="groupings"> groupings </van-tab>
      <van-tab title="群聊" name="group-chat">
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />
        group-chat <br />

        group-chat <br />
        group-chat <br />
        group-chat <br />
      </van-tab>
    </van-tabs> -->
  </div>
</template>

<script lang="ts" setup name="ContactsPage">
  // import { PRIMARY_COLOR } from '@/constants/modules/theme';
  // import { ref } from 'vue';
  // import FriendList from './components/friendList.vue';

  // const active = ref('friend-list');
</script>

<style lang="less" scoped>
  .contacts-page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: var(--van-nav-bar-height);
    padding-bottom: 1.3333rem;
    overflow: auto;
  }
  // :deep(.van-index-anchor) {
  //   // 解决初始高亮项位置偏移问题
  //   left: 0 !important;
  // }
</style>
