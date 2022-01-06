import env from '@/env/env';

const mapInit = (mapId:string = 'map', token:string = MYCONF.MAP.TOKEN, solution:number = MYCONF.MAP.SOLUTION) => {
  const style = `${MYCONF.MAP.SERVICE_URL}/service/solu/style/id/${solution}`;
  const extraSpriteUrl = process.env.NODE_ENV === 'development' ? '/' : import.meta.env.VITE_APP_BASE_PATH;
  // const spriteUrl = [MYCONF.MAP.SPRITE_URL, `${extraSpriteUrl}sprite/sprite`];
  const spriteUrl = MYCONF.MAP.SPRITE_URL;
  minemap.accessToken = token;
  // minemap.key = token;
  minemap.solution = solution;
  minemap.domainUrl = MYCONF.MAP.DOMAIN;
  minemap.dataDomainUrl = MYCONF.MAP.DATA_DOMAIN_URL;
  minemap.serverDomainUrl = MYCONF.MAP.SERVICE_DOMAIN_URL;
  minemap.serviceUrl = `${MYCONF.MAP.SERVICE_URL}/service`;
  minemap.spriteUrl = spriteUrl;
  minemap.fontsUrl = MYCONF.MAP.FONT_URL;
  env.map = new minemap.Map({
    container: mapId,
    style, // MYCONF.MAP.STYLE
    center: MYCONF.MAP.CENTER,
    zoom: MYCONF.MAP.ZOOM,
    boxZoom: false,
    pitch: 0,
    maxZoom: 21, // 地图最大缩放级别限制
    minZoom: 1,
    // 经纬度投影设置
    // projection: minemap.ProjectionType.LATLON,
    projection: MYCONF.MAP_PROJECTION_TYPE, // 经纬度投影：LATLON，墨卡托投影：MERCATOR
    preserveDrawingBuffer: false, // 截取canvas图片功能
  });
  env.map.repaint = true;
  env.map.timer.state = true;
  env.map.scrollZoom.setWheelZoomRate(1 / 1000); // 速率值越小，地图的缩放越细腻
  env.map.on('load', () => {
    env.map.resize();
  });

  return env.map;
};

export default mapInit;
