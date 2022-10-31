<template>
  <div class="user-status">
    <div class="user-avatar">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        fit="cover"
        position="center"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        style="display: block"
      />
    </div>
    <div class="user-status-info">
      <div class="user-nickname">一隅北</div>
      <div class="user-online-status"><div class="status-dot"></div> 在线</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .user-status {
    display: flex;
    height: 1.2rem;
    align-items: center;
    .user-avatar {
      padding: 2px;
      background-color: #fff;
      border-radius: 50%;
    }
    .user-status-info {
      margin-left: 6px;
      color: #fff;
      .user-nickname {
        // font-size: var(--van-font-size-md);
        height: auto;
      }
      .user-online-status {
        display: flex;
        align-items: center;

        font-size: var(--van-font-size-xs);
        line-height: var(--van-line-height-xs);
      }
      .status-dot {
        height: var(--van-font-size-xs);
        width: var(--van-font-size-xs);
        background-color: #24e58a;
        border-radius: 50%;
        margin: 0 4px;
      }
    }
  }
</style>
