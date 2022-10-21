<template>
  <div class="app-layout">
    <!-- layout hearder => top nav bar & search & other actions -->
    <layout-header />

    <!-- context body & router view -->
    <router-view />

    <!-- layout footer => bottom nav bar & copyright -->
    <layout-footer />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from './components/header/index.vue';
  import LayoutFooter from './components/footer/index.vue';
</script>

<style lang="" scoped></style>
