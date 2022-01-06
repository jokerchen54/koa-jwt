<template>
    <div>
        <div v-show="props.isShow">
            {{props.foo}}
        </div>
        <el-button @click="changeHandle">改变页眉</el-button>
        <el-button @click="changeIsShow">隐藏页面</el-button>
    </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isShow: Boolean,
  foo: String,
});
const emits = defineEmits(['update:foo', 'updateShow']);
const changeHandle = () => {
  emits('update:foo', 'dd');
};
const changeIsShow = () => {
  emits('updateShow', !props.isShow);
};
</script>
<style scoped lang="less">

</style>
