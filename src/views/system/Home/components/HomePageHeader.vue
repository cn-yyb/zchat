<template>
  <layout-header>
    <template #left>
      <user-status @show-setting="showSetting" />
    </template>
    <template #right>
      <van-popover
        v-model:show="showPopover"
        :actions="actions"
        :show-arrow="false"
        placement="bottom-end"
        @select="onSelect"
      >
        <template #reference>
          <van-icon name="plus" class="nav-bar-icon" />
        </template>
      </van-popover>
    </template>
  </layout-header>
  <!--user setting page -->
  <user-setting ref="settingCompRef" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import LayoutHeader from '@/layout/components/header/index.vue';
  import UserStatus from '@/layout/components/header/UserStatus.vue';
  import UserSetting from '@/views/system/User/index.vue';
  import { showToast, type PopoverAction } from 'vant';

  const settingCompRef = ref<InstanceType<typeof UserSetting> | null>(null);

  const showSetting = () => {
    settingCompRef.value?.showSettingPopup();
  };

  const showPopover = ref(false);
  const actions: PopoverAction[] = [
    { text: '创建群聊', icon: 'comment-o' },
    { text: '加好友/群', icon: 'friends-o' },
    { text: '通知管理', icon: 'volume-o' },
  ];

  const onSelect = (action: PopoverAction) => showToast(action.text);
</script>

<style lang="less" scoped>
  .nav-bar-icon {
    color: #fff;
    font-size: 0.5rem;
  }
</style>
