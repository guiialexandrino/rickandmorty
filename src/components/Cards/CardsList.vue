<template>Exibe LISTA</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';
import type { PropType } from 'vue';

const props = defineProps({
  characters: { type: Array as PropType<Card[]>, required: true },
});
</script>

<style scoped lang="less" src="./CardsList.less" />
