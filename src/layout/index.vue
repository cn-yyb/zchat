<template>
  <div class="app-layout">
    <!-- layout hearder => top nav bar & search & other actions -->
    <layout-header :title="headerTitle">
      <template #left>
        <user-status />
      </template>
    </layout-header>

    <!-- context body & router view -->
    <router-view />

    <!-- layout footer => bottom nav bar & copyright -->
    <layout-footer />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from './components/header/index.vue';
  import LayoutFooter from './components/footer/index.vue';
  import UserStatus from './components/header/UserStatus.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const headerTitle = ref('');

  watch(
    () => router.currentRoute,
    (currentRoute) => {
      if (currentRoute.value.meta?.hiddenTitle) {
        headerTitle.value = '';
      } else {
        headerTitle.value = currentRoute.value.meta?.title;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
</script>

<style lang="" scoped></style>
