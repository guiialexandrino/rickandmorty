<template>
  <div class="row q-my-xl text-h5">
    <a @click="$emit('handleClick')">Personagens</a>
    / <slot>Página</slot>
  </div>
</template>

<script setup lang="ts">
defineEmits(['handleClick']);
</script>
