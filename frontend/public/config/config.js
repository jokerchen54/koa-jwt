/* eslint-disable no-unused-vars */
// const MAP_BASE_URL = '//10.1.100.19:18080'; // minedata(以下涉及此地址均需要更改)
// const MAP_SERVICE_URL = '//10.1.100.19:18080'; // minedata本地部署service服务地址
const MAP_BASE_URL = 'https://minedata.cn'; // minedata(以下涉及此地址均需要更改)
const MAP_SERVICE_URL = 'https://minedata.cn'; // minedata(以下涉及此地址均需要更改)
const MYCONF = {
  //   BASE_URL: '//113.108.157.29:9298',
  // BASE_URL: '//113.108.157.29:7102/service/lbs', // 自己的后台服务
  BASE_URL: '//localhost:3000', // 自己的后台服务
  LBS_KEY: '30e5f586da944c9a903e420102344841',
  MAP: {
    DOMAIN: MAP_SERVICE_URL,
    DATA_DOMAIN_URL: MAP_SERVICE_URL,
    SERVICE_DOMAIN_URL: MAP_SERVICE_URL,
    SERVICE_URL: MAP_SERVICE_URL,
    SPRITE_URL: `${MAP_BASE_URL}/minemapapi/v3.3.0/sprite/sprite`,
    FONT_URL: `${MAP_BASE_URL}/minemapapi/v3.3.0/fonts`,
    SOLUTION: 12877, // 默认地图solution 16768 12688
    TOKEN: 'ca78282dfff148e3be5390ce027068f5', // 默认地图appKey
    // TOKEN: 'ca78282dfff148e3be5390ce027068f5', // 默认地图appKey
    CENTER: [119.3050991, 26.113629], // 地图初始中心点
    ZOOM: 13, // 地图初始zoom级别
  },
  TIME_INTERVAL: 1000 * 60, // 实时刷新频率
  MAP_PROJECTION_TYPE: 'MERCATOR', // 经纬度投影：LATLON，墨卡托投影：MERCATOR
  MAP_TEMPLATE_APP_KEY: 'ca78282dfff148e3be5390ce027068f5', // 工作台模块地图模板固定appKey
};
