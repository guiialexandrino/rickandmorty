<template>
  <div>
    {{ model }}
    <q-select
      :outlined="true"
      v-model="model"
      label-color="pink"
      :input-style="'color: white'"
      bg-color="black"
      use-input
      input-debounce="0"
      :options="filterValue"
      @filter="filter"
      style="width: 250px"
    />
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const model = ref(null);
const filterOptions = computed(() => {
  return store.state.characters.map((char: Card) => char.name);
});

const filterValue = ref<Card[]>([]);
filterValue.value = [...filterOptions.value];

function filter(val: string, update: any) {
  update(() => {
    if (val === '') {
      filterValue.value = [...filterOptions.value];
    } else {
      const needle = val.toLowerCase();
      filterValue.value = filterOptions.value.filter((v: string) => {
        return v.toLowerCase().indexOf(needle);
      });
    }
  });
}
</script>
