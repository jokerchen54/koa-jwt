import env from '@/env/env';

export const addEndPoint = (data:any) => {
  // console.log(data);
  if (env.map.getLayer('endPoint')) env.map.removeLayer('endPoint');
  if (env.map.getSource('endPoint')) env.map.removeSource('endPoint');

  const center = data.location.split(',').map((item:string) => Number(item));
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: center,
        },
      },
    ],
  };
  env.map.addSource('endPoint', {
    type: 'geojson',
    data: geojson,
  });
  // 添加图层
  env.map.addLayer({
    id: 'endPoint',
    type: 'symbol',
    source: 'endPoint',
    layout: {
      'icon-allow-overlap': true,
      'icon-image': 'marker-15',
      'icon-size': 2,
      'icon-anchor': 'bottom', // 设置图标的一部分放置在最靠近锚点的位置
    },
  });
  env.map.easeTo({
    center,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    duration: 500,
  });
};
