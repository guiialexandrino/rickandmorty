<template>
  <div class="row q-my-xl q-mt-lg text-h5 items-end">
    <a @click="$emit('handleClick')">Characters</a> / <slot>Page</slot>
  </div>
</template>

<script setup lang="ts">
defineEmits(['handleClick']);
</script>

<style lang="less" src="./Nav.less" />
