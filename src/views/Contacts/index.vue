<template>
  <div class="contacts-page" id="__sroll-box" ref="contactsPageRef">
    <contacts-page-header />
    <van-tabs v-model:active="active" :color="PRIMARY_COLOR">
      <van-tab title="好友" name="contact-list">
        <contact-list />
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
    </van-tabs>
    <BackTop target="#__sroll-box" />
  </div>
</template>

<script lang="ts" setup name="ContactsPage">
  import { onActivated, ref } from 'vue';
  import { PRIMARY_COLOR } from '@/constants/modules/theme';
  import ContactsPageHeader from './components/ContactsPageHeader.vue';
  import ContactList from './components/ContactList.vue';
  import BackTop from '@/components/BackTop/index.vue';
  import { useEventListener } from '@vant/use';

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
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 1.3333rem;
    overflow: auto;
  }
</style>
