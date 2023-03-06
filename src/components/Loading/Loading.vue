<template>
  <div class="row justify-center items-center _loadingContainer">
    <div class="images">
      <img class="img1" src="../../assets/images/Loading.png" />
      <img class="img2" src="../../assets/images/Loading2.png" />
      <h1 class="percent">001%</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  window.document.body.style.overflowY = 'hidden';
  window.document.body.style.overflowX = 'hidden';
});

onUnmounted(() => {
  window.document.body.style.overflowY = 'auto';
  window.document.body.style.overflowX = 'auto';
});
</script>

<style scoped lang="less" src="./Loading.less" />
