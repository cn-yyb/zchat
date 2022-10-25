<template>
  <div class="view-home">
    <van-button @click="handleCountAdd" type="primary"
      >count：{{ counterStore.$state.count }}</van-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { useCounterStore } from '@/stores/modules/counter';

  const counterStore = useCounterStore();

  const handleCountAdd = () => counterStore.$state.count++;
</script>

<style lang="less" scoped>
  .view-home {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7978ff;
    font-size: 1rem;
    font-weight: 700;
    font-style: italic;
    padding: 2rem;
  }
</style>
