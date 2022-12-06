<template>
  <div>
    <div class="demo-image__lazy">
      <el-image
        v-for="url in imgs"
        @click="imgOpen(url)"
        :key="url"
        :src="'./imgs/' + url"
        fit="contain"
        lazy
      />
    </div>

    <div class="big_bg" v-if="imgShow" @click="imgShow = false">
      <el-image :src="big_url" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const imgs = [
  "sun.jpeg",
  "sun.jpeg",
  "sun.jpeg",
  "sun.jpeg",
  "sun.jpeg",
  "sun.jpeg",
];
const imgShow = ref(false);
const big_url = ref("");
const imgOpen = (url: any) => {
  imgShow.value = true;
  big_url.value = "./imgs/" + url;
};
</script>

<style scoped>
.demo-image__lazy {
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}
.demo-image__lazy .el-image {
  display: block;
  margin: 1%;
  width: 23%;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
.big_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(213, 213, 213, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.big_bg .el-image {
  min-width: 50%;
  min-height: 50%;
}
</style>
