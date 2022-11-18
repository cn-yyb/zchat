<template>
  <layout-header>
    <template #left>
      <van-icon name="arrow-left" class="nav-bar-icon" @click="$router.back()" />
      <user-status
        is-hidden-avatar
        :user-status="{ nickname: '张三', status: UserStatusEnum.OFFLINE }"
      />
    </template>
    <template #right>
      <van-icon name="ellipsis" class="nav-bar-icon" />
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
  import { UserStatusEnum } from '@/constants/enums/userEnum';

  const settingCompRef = ref<InstanceType<typeof UserSetting> | null>(null);
</script>

<style lang="less" scoped>
  .nav-bar-icon {
    color: #fff;
    font-size: 0.5rem;
  }
</style>
