<template>
  <div
    class="back-top"
    :class="{
      'btn-hidden': !isShow,
    }"
    :style="{ backgroundColor: color }"
  >
    <van-icon name="down" size="0.6rem" class="inner" @click="handleBackTop" />
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  const props = defineProps({
    maxScrollTop: {
      type: Number,
      default: 1200,
    },
    target: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  });

  const isShow = ref(false);

  const handleBackTop = () => {
    const el = document.querySelector(props.target);
    el && (el!.scrollTop = 0);
  };

  function scrollEventCallBack(e) {
    isShow.value = e.target?.scrollTop > props.maxScrollTop;
  }

  onMounted(() => {
    const el = document.querySelector(props.target);
    el?.classList.add('add-transition');
    el?.addEventListener('scroll', scrollEventCallBack);
  });

  onBeforeUnmount(() => {
    document.querySelector(props.target)?.removeEventListener('scroll', scrollEventCallBack);
  });
</script>

<style lang="less" scoped>
  .back-top {
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    z-index: auto;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    color: #fff;
    transform: rotate(180deg);
    background-color: var(--theme-primary-color);
    z-index: 100;
    transition: opacity 0.5s;
    opacity: 1;
    .inner {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .btn-hidden {
    opacity: 0;
  }

  :global(.add-transition) {
    transition: all 0.5s ease-out;
  }
</style>
