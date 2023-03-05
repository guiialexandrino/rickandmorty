<template>
  <div class="row q-mt-md q-gutter-x-sm flex justify-end">
    <Transition mode="out-in">
      <div
        v-if="listCards === 'grid'"
        :class="useAlphabetical"
        @click="sortGrid"
      >
        <img src="../../assets/icons/sort-alphabetical-ascending.svg" />
      </div>
    </Transition>
    <div :class="checkSelected('grid')" @click="changeCharactersView('grid')">
      <img src="../../assets/icons/dots-grid.svg" />
    </div>
    <div :class="checkSelected('list')" @click="changeCharactersView('list')">
      <img src="../../assets/icons/format-list-bulleted.svg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type ListCard from '../../types/Filter';

const emit = defineEmits(['sortGrid', 'grid-view', 'list-view']);

const alphabetical = ref(false);
const listCards = ref<ListCard>('grid');

function checkSelected(opt: ListCard) {
  return listCards.value === opt ? '_icon _iconSelected' : '_icon';
}

function changeCharactersView(opt: ListCard) {
  listCards.value = opt;
  if (opt === 'grid') emit('grid-view');
  else emit('list-view');
}

function sortGrid() {
  alphabetical.value = !alphabetical.value;
  emit('sortGrid');
}

const useAlphabetical = computed(() => {
  return alphabetical.value ? '_icon _iconSelected' : '_icon';
});
</script>

<style scoped lang="less" src="./FilterOptions.less" />
