<template>
  <div class="row justify-center items-center _loadingContainer">
    <div class="images">
      <img class="img1" src="../../assets/images/Loading.png" />
      <img class="img2" src="../../assets/images/Loading2.png" />
      <!-- <h2 class="loading">Loading...</h2> -->
      <h2 v-if="showProcess" class="percent">{{ value }}%</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const value = computed(() => {
  let percent = '';
  if (store.state.loadingProcess < 10)
    percent = `00${store.state.loadingProcess}`;
  else if (store.state.loadingProcess >= 10 && store.state.loadingProcess < 100)
    percent = `0${store.state.loadingProcess}`;
  else {
    percent = store.state.loadingProcess;
  }

  return percent;
});
const showProcess = computed(() => {
  return store.state.loadingShowProcess;
});

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
