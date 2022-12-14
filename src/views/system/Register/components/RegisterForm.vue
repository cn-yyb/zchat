<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        autofocus
        v-model.trim="registerForm.username"
        name="username"
        label="用户名"
        autocomplete="off"
        placeholder="请输入用户名"
        :rules="[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            pattern: /^[a-zA-Z0-9-_]{4,16}$/,
            message: '用户名格式为4到16位字母或数字组成',
          },
        ]"
      />
      <van-field
        v-model.trim="registerForm.password"
        type="password"
        name="password"
        label="登录密码"
        autocomplete="off"
        :rules="[
          {
            required: true,
            message: '请输入登录密码',
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
            message: '密码最短八个字符，必须包含大小写字母、数字和特殊字符',
            trigger: 'onChange',
          },
        ]"
        placeholder="请输入登录密码"
      />
      <van-field
        v-model.trim="registerForm.rePassword"
        type="password"
        name="rePassword"
        autocomplete="off"
        label="确认密码"
        placeholder="请输入确认密码"
        :rules="[
          {
            validator: rePasswordValidator,
          },
        ]"
      />
      <van-field
        v-model.trim="registerForm.email"
        name="email"
        label="账户邮箱"
        placeholder="请输入邮箱地址"
        :rules="[
          {
            required: true,
            message: '请输入邮箱地址',
          },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '请输入合法的邮箱地址',
          },
        ]"
      />
      <van-field
        v-model="registerForm.birthday"
        is-link
        readonly
        name="datetimePicker"
        label="出生年月"
        @click="showPicker = true"
      />
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="registerForm.gender" direction="horizontal" size="small">
            <van-radio :name="1">先生</van-radio>
            <van-radio :name="2">女士</van-radio>
            <van-radio :name="0">保密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: var(--van-padding-md)">
      <van-button block type="primary" native-type="submit" :loading="loading"> 提交 </van-button>
    </div>
  </van-form>

  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-datetime-picker
      type="date"
      title="出生年月"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/stores/modules/user';
  import dayjs from 'dayjs';
  import { Dialog } from 'vant';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  interface RegisterForm {
    username: string;
    password: string;
    rePassword: string;
    email: string;
    gender: 0 | 1 | 2;
    birthday: string;
  }

  const userStore = useUserStore();
  const router = useRouter();

  const loading = ref(false);
  const registerForm = reactive<RegisterForm>({
    username: 'kula0410',
    password: '123456@Abc',
    rePassword: '123456@Abc',
    email: 'sdpzhong@163.com',
    gender: 0,
    birthday: '1999/04/10',
  });
  const showPicker = ref(false);
  const minDate = new Date(1990, 1, 1);
  const maxDate = new Date();

  const rePasswordValidator = (value) => {
    if (value !== registerForm.password) {
      return '确认密码和新密码不一致!';
    } else {
      return true;
    }
  };

  const onConfirm = (value) => {
    registerForm.birthday = dayjs(value).format('YYYY/MM/DD');
    showPicker.value = false;
  };

  const onSubmit = (value) => {
    try {
      loading.value = true;
      console.log(value);
      Dialog.confirm({
        title: '注册成功！',
        message: '新账户已成功创建，是否以当前账号登录？',
        beforeClose: (action) =>
          new Promise((resolve) => {
            if (action === 'confirm') {
              setTimeout(() => {
                userStore.loign({
                  username: value.username,
                  password: value.password,
                });
                resolve(true);
              }, 1000);
            } else {
              router.push('/login');
              // 拦截取消操作
              resolve(true);
            }
          }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
</script>

<style lang="less" scoped>
  :deep(.van-cell-group--inset) {
    border-radius: var(--van-border-radius-sm);
  }
</style>
