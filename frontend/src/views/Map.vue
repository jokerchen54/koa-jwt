<template>
  <MapContainer></MapContainer>
  <div class="search-box">
    <div class="search-box-ul">
      <span>POI搜索：</span>
      <el-input v-model="state.POIkeyword"></el-input>
      <el-button class="button" type="primary" @click="searchPOI">搜索</el-button>
      <ul class="res-box" v-show="state.POIList.length > 0">
        <li v-for="(item) in state.POIList" :key="item.nid" @click="clickPOI(item)">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import MapContainer from '@/components/map/MapContainer.vue';
import { requestPOI, requestRecode, requestCode } from '@/api/map/map';
import { addEndPoint } from '@/utils/index';

const state = reactive({
  POIkeyword: '',
  POIList: [] as Array<any>,
});
const searchPOI = () => {
  const params = {
    keywords: state.POIkeyword,
    // city: currentCity,
    city: '福州市',
    search_type: 'for_keywords',
    page_num: 1,
    page_size: 20,
    key: MYCONF.LBS_KEY,
  };
  requestPOI(params).then((res: any) => {
    // console.log(res);
    state.POIList = res.pois;
  });
};
const clickPOI = (data: any) => {
  //   console.log(data);
  addEndPoint(data);
  state.POIList = [];
};
</script>
<style scoped lang="less">
.search-box {
  z-index: 4;
  position: absolute;
  top: 5vh;
  left: 5vw;
  display: flex;
  .search-box-ul {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
  span {
    width: 150px;
    margin-right: 10px;
  }
  .el-input {
    margin-right: 10px;
  }
  // width: 200px;
}
.res-box {
  position: absolute;
  list-style: none;
  top: 30px;
  left: 75px;
  li {
    height: 20px;
    margin-bottom: 3px;
    cursor: pointer;
    padding: 3px;
    background-color: #fff;
    &:hover {
      background-color: red;
    }
  }
}
</style>
