<template>
  <div class="applets-page">
    <applets-page-header />
    <van-search
      input-align="center"
      placeholder="搜索"
      readonly
      @click-input="$router.push('/applets-search')"
    />
    <!-- <van-empty description="Applets 模块未开发" /> -->
    <applets-grid />
  </div>
</template>

<script lang="ts" setup name="AppletsPage">
  import AppletsGrid from './components/AppletsGrid.vue';
  import AppletsPageHeader from './components/AppletsPageHeader.vue';
</script>

<style lang="less" scoped>
  .applets-page {
    position: absolute;
    top: 0;
    bottom: 1.3333rem;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: #f8f8f8;
  }
</style>
