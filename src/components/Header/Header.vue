<template>
  <header ref="header" class="row items-center justify-center _background">
    <div class="col q-px-md _nav">
      <div class="row items-center justify-between">
        <img src="../../assets/images/LogoHeader3.png" />
        <span>busca</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const header = ref<HTMLDivElement | null>(null);

window.addEventListener('scroll', showHeader);

function showHeader() {
  if (window.pageYOffset >= 220) {
    if (header.value) header.value.style.transform = 'translateY(0px)';
  } else {
    if (header.value) header.value.style.transform = 'translateY(-60px)';
  }
}
</script>

<style scoped lang="less" src="./Header.less" />
