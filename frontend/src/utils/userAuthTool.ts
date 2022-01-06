import { isEmpty } from './stringUtil';
import cookieTool from './cookieTool';
import userTool from './userTool';

const isLoginAuthExpires = () => {
  const accessToken = cookieTool.getCookie('accessToken');
  const refreshToken = cookieTool.getCookie('refreshToken');
  if (isEmpty(accessToken) || isEmpty(refreshToken)) return true;

  const nowTime = new Date().getTime();
  const expiresTime = cookieTool.getCookie('expiresTime') || '0';
  return nowTime > parseInt(expiresTime, 10) - 10 * 60 * 1000;
};
const updateAuthAccessToken = (res:any) => {
  if (res && res.code === '00000') {
    const authToken = res.result;
    const expiresTimeIn:string = '21600';
    const h = Number(Number(expiresTimeIn) / 3600);
    cookieTool.addCookie('accessToken', authToken.accessToken || '', h);
    cookieTool.addCookie('username', authToken.username || '', h);

    cookieTool.addCookie('refreshToken', authToken.refreshToken || '', h);
    cookieTool.addCookie('expiresTime', authToken.expiresTime, h);
  } else {
    userTool.goLogin();
  }
};
const userAuthTool = {
  isLoginAuthExpires,
  //   getAuthAccessToken,
  updateAuthAccessToken,
  //   getAuthToken,
  //   getAuthHeaders,
};

export default userAuthTool;
