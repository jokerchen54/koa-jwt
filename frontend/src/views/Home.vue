<template>
    <div class="home">
        <el-button @click="requestCookie">cookie</el-button>
        <el-button @click="requestSession">session</el-button>
        <el-button @click="login">登陆</el-button>
        <el-button @click="getUserInfo">获取用户信息</el-button>
        <el-button @click="updateToken">刷新token</el-button>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import useStore from '@/hooks/useStore';
import {
  testCookie, testSession, loginToken, requestUser,
} from '@/api/user/user';
import cookieTool from '@/utils/cookieTool';
import userAuthTool from '@/utils/userAuthTool';
import userTool from '@/utils/userTool';

const {
  state, dispatch, getters, commit,
} = useStore();
// const name = computed(()=> store.getters['username'])
// console.log(store.state.user.username);

// commit('common', true);
// dispatch('common/get_data')

// requestUserInfo().then((res) => {
//   console.log(res);
// });
const requestCookie = () => {
  testCookie().then((res) => {
    console.log('test Cookie');
  });
};
const requestSession = () => {
  // cookieTool.deleteCookie('sid');
  testSession().then((res) => {
    console.log('test Session');
  });
};
const login = () => {
  const params = {
    username: 'laochen',
  };
  loginToken(params).then((res) => {
    console.log(res);
    ElMessage.success('登录成功');
    userAuthTool.updateAuthAccessToken(res);
  });
};
const getUserInfo = () => {
  requestUser().then((res:any) => {
    // console.log(JSON.stringify(res));
    ElMessage.success(`欢迎${res.userinfo}`);
  });
};
const updateToken = () => {
  userTool.delAccessToken();
  getUserInfo();
};
</script>
<style lang="less">
    .home {
        background-color: red
    }
</style>
