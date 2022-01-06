import cookieTool from './cookieTool';
import { isNotEmpty } from './stringUtil';

const userTool = {
  getLoginUserId() {
    return cookieTool.getCookie('userId');
  },
  getLoginUserName() {
    return cookieTool.getCookie('username');
  },
  getLoginAuthAccessToken() {
    return cookieTool.getCookie('accessToken');
  },
  getLoginAuthRefreshToken() {
    return cookieTool.getCookie('refreshToken');
  },
  getLoginAuthExpiresTime() {
    return cookieTool.getCookie('expiresTime');
  },
  isLogin() {
    const username = cookieTool.getCookie('username');
    const refreshToken = cookieTool.getCookie('refreshToken');
    return isNotEmpty(username) && isNotEmpty(refreshToken);
  },
  delAccessToken() {
    cookieTool.deleteCookie('accessToken');
  },
  getLoginUser() {
    return {
      username: cookieTool.getCookie('username'),
      access_token: cookieTool.getCookie('accessToken'),
      refreshToken: cookieTool.getCookie('refreshToken'),
      expiresTime: cookieTool.getCookie('expiresTime'),
    };
  },

  clearLoginUser() {
    cookieTool.deleteCookie('username');
    cookieTool.deleteCookie('access_token');
    cookieTool.deleteCookie('refreshToken');
    cookieTool.deleteCookie('expiresTime');
  },

  goLogin() {
    userTool.clearLoginUser();
    if (process.env.NODE_ENV === 'development') {
      window.location.href = '/pgis/login';
    } else {
      window.location.href = '/pgis/login';
    }
  },
};

export default userTool;
