<template>
    <div class="demo-image">
        <!-- <div v-for="fit in state.fits" :key="fit" class="block">
            <span class="demonstration">{{ fit }}</span>
            <el-image style="width: 100px; height: 100px" :src="state.url" :fit="fit"></el-image>
        </div> -->
        <svg-icon icon-class="gulou"></svg-icon>

        <el-image style="width: 100px; height: 100px" :src="state.url"></el-image>
        <div class="box">51951</div>
        <Children v-model:foo="state.foo" :isShow="state.isShowFoo" @updateShow="updateShow"></Children>
    </div>
</template>
<script setup lang="ts">
import Children from '@/components/Children.vue';

const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  foo: '页脚',
  isShowFoo: true,
});
const updateShow = (isShow:boolean) => {
  state.isShowFoo = isShow;
};
</script>
<style scoped lang="less">
.box {
    background-color: @baseColor;
}
</style>
