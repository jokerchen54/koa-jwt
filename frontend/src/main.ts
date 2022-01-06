import { createApp } from 'vue';
import { ElImage, ElButton } from 'element-plus';

import App from './App.vue';
import router from './router/index';
import 'vue-global-api';
import store from './store';
import 'element-plus/dist/index.css';

// 需要全局引入再添加
import 'vite-plugin-svg-icons/register';
import svgIcon from './components/common/SvgIcon/index.vue';

// less
import './assets/style/index.less';

createApp(App)
  .use(router)
  .use(store)
  .use(ElImage)
  .use(ElButton)
  .component('svg-icon', svgIcon)
  .mount('#app');
