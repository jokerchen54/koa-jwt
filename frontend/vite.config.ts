import {
  loadEnv, ConfigEnv, UserConfigExport,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteSvgIcons from 'vite-plugin-svg-icons';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const envResolve = (mode: string, env: string) => loadEnv(mode, process.cwd())[env];
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  console.log('🚀 ~ process.env.NODE_ENV ~ 打包路径：', envResolve(mode, 'VITE_APP_BASE_PATH'));
  return {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/assets/style/config.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      viteSvgIcons({
        // 配置路径在你的src里的svg存放文件
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        '@comp': resolve(__dirname, 'src/components'),
      },
    },
    // base: './', // 设置打包路径
    base: process.env.NODE_ENV === 'production' ? envResolve(mode, 'VITE_APP_BASE_PATH') : './', // 设置打包路径
    server: {
      port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
    },
  };
};
