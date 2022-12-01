<template>
  <div class="contacts-page" id="__sroll-box" ref="contactsPageRef">
    <contacts-page-header />
    <van-search
      input-align="center"
      placeholder="搜索"
      readonly
      @click-input="$router.push('/user-search')"
    />
    <van-tabs v-model:active="active" :color="PRIMARY_COLOR">
      <van-tab title="好友" name="contact-list">
        <contact-list />
      </van-tab>
      <van-tab title="分组" name="groupings">
        <contact-group />
      </van-tab>
      <van-tab title="群聊" name="group-chat">
        <chat-group />
      </van-tab>
    </van-tabs>
    <BackTop target="#__sroll-box" />
  </div>
</template>

<script lang="ts" setup name="ContactsPage">
  import { onActivated, ref } from 'vue';
  import { PRIMARY_COLOR } from '@/constants/modules/theme';
  import { useEventListener } from '@vant/use';
  import ContactsPageHeader from './components/ContactsPageHeader.vue';
  import ContactList from './components/ContactList.vue';
  import BackTop from '@/components/BackTop/index.vue';
  import ContactGroup from './components/ContactGroup.vue';
  import ChatGroup from './components/ChatGroup.vue';

  const active = ref('contact-list');
  const contactsPageRef = ref<HTMLDivElement | null>(null);
  const scrollTopRef = ref<number>(0);

  // 容器滚动事件监听, 返回后回到原位
  useEventListener(
    'scroll',
    (e: any) => {
      scrollTopRef.value = e.target?.scrollTop;
    },
    {
      target: contactsPageRef as any,
    },
  );

  onActivated(() => {
    contactsPageRef.value!.scrollTop = scrollTopRef.value;
  });
</script>

<style lang="less" scoped>
  .contacts-page {
    position: absolute;
    top: 0;
    bottom: 1.3333rem;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: #f8f8f8;
  }
</style>
