<template>
  <div class="login-page">
    <div class="top-bar">
      <div class="register-btn">注册</div>
    </div>
    <div class="login-container">
      <div class="login-header">
        <div class="login-logo-title">
          <!-- <div class="app-logo"></div> -->
          <div class="app-title">ZChat.</div>
        </div>
        <div class="app-desc">This is xxxx.</div>
      </div>
      <div class="login-form">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              autofocus
              v-model.trim="loginForm.username"
              name="username"
              label="账号"
              placeholder="请输入账号或邮箱"
              left-icon="user-o"
            />
            <van-field
              v-model.trim="loginForm.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              left-icon="shield-o"
            />
          </van-cell-group>
          <div style="margin: var(--van-padding-md)">
            <van-button block type="primary" native-type="submit" :loading="loading">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    <div class="copyright-info">Copyright © 2011-2022 xx All Rights Reserved.</div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Notify } from 'vant';
  // import { useRouter } from 'vue-router';
  // import { userLogin } from '@/api/modules/login';
  import { useUserStore } from '@/stores/modules/user';

  interface LoginFormType {
    username: string;
    password: string;
  }

  // const router = useRouter();
  const userStore = useUserStore();

  const loginForm = reactive<LoginFormType>({
    username: '',
    password: '',
  });
  const loading = ref(false);

  const onSubmit = (values: LoginFormType) => {
    if (!values.username) {
      Notify({ type: 'warning', message: '请输入您的账号或邮箱' });
      return;
    } else if (!values.password) {
      Notify({ type: 'warning', message: '请输入您的密码' });
    } else {
      submitLoginForm(values);
    }
  };

  async function submitLoginForm(formValues: LoginFormType) {
    try {
      loading.value = true;
      const userinfo = await userStore.loign(formValues);
      console.log(userinfo);
      Notify({ type: 'success', message: '登录成功！' });
      // router.push('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }
</script>

<style lang="less" scoped>
  .login-page {
    height: 100%;
    background-color: #98a8f8;
    .top-bar {
      height: 1rem;
      display: flex;
      justify-content: end;
      align-items: center;
      padding: 0 16px;
      color: #fff;
      .register-btn {
        font-size: 14px;
      }
    }
    .login-container {
      .login-header {
        text-align: center;
        padding: 1.8rem 0 1.2rem;
        .login-logo-title {
          display: flex;
          align-items: center;
          justify-content: center;
          .app-title {
            font-size: 1.4rem;
            font-size: 700;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans',
              Arial, sans-serif;
            font-style: italic;
            // color: #fff;
            background-image: -webkit-linear-gradient(top, #fff, #fff, #98a8f8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }
          .app-logo {
            height: 1.4rem;
            width: 1.4rem;
            background-color: #fff;
            margin-right: 0.5rem;
            border-radius: 10px;

            font-size: 1rem;
            font-size: 700;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans',
              Arial, sans-serif;
            color: #98a8f8;
            text-align: center;
            line-height: 1.4rem;
          }
        }
        .app-desc {
          font-style: italic;
          font-size: 14px;
          color: #eee;
        }
      }
      .login-form {
        margin: 1rem 0 1.4rem;
      }
    }

    .copyright-info {
      text-align: center;
      position: fixed;
      font-size: 12px;
      color: #fff;
      bottom: 4px;
      left: 0;
      right: 0;
    }
  }

  :deep(.van-cell-group--inset) {
    // border-radius: 4px;
    border-radius: var(--van-border-radius-sm);
  }
</style>
