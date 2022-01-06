<template>
    <div id="map"></div>
</template>
<script lang="ts">
import { nextTick, onMounted, PropType } from 'vue';
import mapInit from './mapInit';
import useStore from '@/hooks/useStore';

export interface MapProps {
  token: string;
  solution: number;
  toolShow? : Boolean;
}
let map = null;
export default {
  props: {
    token: {
      type: String as PropType<MapProps['token']>,
      default: MYCONF.MAP.TOKEN,
    },
    solution: {
      type: Number as PropType<MapProps['solution']>,
      default: MYCONF.MAP.SOLUTION,
    },
    toolShow: {
      type: Boolean as PropType<MapProps['toolShow']>,
      default: true,
    },
  },
  setup(props:MapProps) {
    const store = useStore();
    // const mapHandler = new MapHandler(store);
    onMounted(() => {
      // 置空初始状态
      // store.commit('map/setIsMapLoaded', false);
      store.commit('map/set_isMapLoaded', false);
      nextTick(() => {
        map = mapInit('map', props.token, props.solution);
        map.on('load', () => {
          console.log('地图加载完毕'); // laochen log
          store.commit('map/set_isMapLoaded', true);
          // mapHandler.init();
        });
      });
    });
  },
};
</script>
<style lang="less" scoped>
#map{
  width: 100%;
  height: 100%;
  z-index: 2;
  flex: 1;
  position: absolute;
}
</style>
