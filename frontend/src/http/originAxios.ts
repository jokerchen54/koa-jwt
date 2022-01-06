/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import { ElMessage } from 'element-plus';
import userTool from '@/utils/userTool';
import userAuthTool from '@/utils/userAuthTool';

const { CancelToken } = axios;
const cancelUrlList = ['login-token'];
let cancelSign:any = null;
// 指定的接口，进行重复请求过滤处理，避免重复
const removePendingRequest = (config:any) => {
  cancelSign && cancelSign('中止请求');
};
let accessToken = '';
/* 是否有请求正在刷新token */
window.isRefreshing = false;
/* 被挂起的请求数组 */
let refreshSubscribers:Function[] = [];

/* push所有请求到数组中 */
function subscribeTokenRefresh(cb:Function) {
  refreshSubscribers.push(cb);
}

/* 刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据） */
function onRrefreshed(token:string) {
  refreshSubscribers.map((cb) => cb(token));
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAxiosHttp = (_config: {} = {}, baseURL = '/') => {
  const axiosParams = {
    ..._config,
    // timeout: 500000,
    baseURL,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    withCredentials: true, // 是否携带cookie
  };
  const fetch = axios.create(axiosParams);
  fetch.interceptors.request.use(
    async (config:any) => {
      // token过期验证\刷新token
      // 将过期请求挂起，刷新token后重新请求(存在n个异步请求,易漏处理)
      if (userTool.isLogin() && userAuthTool.isLoginAuthExpires()) {
        /* 把token失效的请求(token)=>{....}都push到一个数组中 */
        const retry = new Promise((resolve, reject) => {
          /* (token) => {...}这个函数就是回调函数 */
          subscribeTokenRefresh((token:string) => {
            config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
            /* 将请求挂起 */
            resolve(config);
          });
        });

        /**
         * 确保只有一个刷新token的请求
         * 获取到更新的token，同步更新cookie和CONST相关状态
         */
        if (!window.isRefreshing) {
          const url = `${MYCONF.BASE_URL}/users/re-token`;
          const data = {
            // grant_type: 'refresh_token',
            // client_id: 'chen-client',
            // client_secret: 'chen-secret',
            refreshToken: userTool.getLoginAuthRefreshToken(),
          };
          window.isRefreshing = true;
          await axios.post(url, data).then(
            (res:any) => {
              res = res.data;
              if (res.code === '00000') {
                window.isRefreshing = false;
                if (!res) return;
                onRrefreshed(res.result.accessToken);
                /* 执行onRefreshed函数后清空数组中保存的请求 */
                refreshSubscribers = [];
                userAuthTool.updateAuthAccessToken(res);
                accessToken = userTool.getLoginAuthAccessToken();
              } else {
                ElMessage.warning('登录状态失效，请重新登录');
                userTool.goLogin();
              }
            },
            (err) => {
              ElMessage.warning('登录状态失效，请重新登录');
              userTool.goLogin();
            },
          );
        }

        return retry;
      }
      accessToken = userTool.getLoginAuthAccessToken();
      // 带上token
      config.headers.Authorization = `Bearer ${accessToken}`;

      // 本地json文件
      if (config.url.includes('.json')) {
        config.baseURL = process.env.NODE_ENV === 'development' ? '/' : MYCONF.localAddress;
        return config;
      }

      // 导入文件设置自定义contentType
      if (
        config.url.includes('importLayerData')
        || config.url.includes('importDevice')
        || config.url.includes('importFile')
        || config.url.includes('uploadFile')
      ) {
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
      }

      // 判断请求的类型：如果是post请求就把默认参数拼到data里面；如果是get请求就拼到params里面
      if (config.method === 'post') {
        config.data = {
          ...config.data,
        };
      }

      /**
       * cancelUrlList中多请求情况下，只保留当前请求，
       * 取消之前请求的pending状态
       */
      if (
        cancelUrlList.includes(
          config.url
            .split('?')[0]
            .split('/')
            .pop(),
        )
      ) {
        removePendingRequest(config);
        config.cancelToken = new CancelToken((c) => {
          cancelSign = c;
        });
      }
      return config;
    },

    (error) => Promise.reject(error),
  );
  fetch.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        const { data } = response;
        const { error } = data || {};
        return data;
        // if (data.success) {
        //   return data;
        // }
        // if (data.status === 0) {
        //   return data;
        // }
        // if (error) {
        //   source.cancel();
        //   return Promise.reject({
        //     message: error?.message || '',
        //     code: '',
        //   });
        // }
        // return data.data;
      }
      return response;
    },
    (error: any) => {
      const defaultMessage = '网络错误 稍后再试';
      return Promise.reject({
        message: (error && error.message) || defaultMessage,
        code: null,
      });
    },
  );
  return fetch;
};
export default createAxiosHttp();
