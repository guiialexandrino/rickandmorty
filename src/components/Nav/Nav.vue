<template>
  <div class="row q-my-xl q-mt-lg text-h5 items-end">
    <a @click="$emit('handleClick')">Personagens</a> / <slot>Página</slot>
  </div>
</template>

<script setup lang="ts">
defineEmits(['handleClick']);
</script>
