<template>
  <div class="_minHeight_">
    <Transition mode="out-in">
      <div>
        <Logo />
        <div class="row justify-center q-my-lg">
          <Search />
        </div>
        <FilterOptions
          :alphabetical="sort"
          :listCards="showCharactersInfo"
          @sort-grid="handleSortGrid"
          @grid-view="handleSelectGrid"
          @list-view="showCharactersInfo = 'list'"
        />
        <Transition mode="out-in">
          <CardsList
            v-if="showCharactersInfo === 'list'"
            :characters="charactersCard"
          />
        </Transition>
        <Transition mode="out-in">
          <CardsView
            v-if="showCharactersInfo === 'grid'"
            :characters="charactersCard"
            :sort="sort"
          />
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

import type { Card } from '../../types/Cards';
import type Filter from '../../types/Filter';

import CardsView from '@/components/Cards/CardsView.vue';
import CardsList from '@/components/Cards/CardsList.vue';
import Logo from '@/components/Logo/Logo.vue';
import FilterOptions from '@/components/FilterOptions/FilterOptions.vue';
import Search from '@/components/Search/Search.vue';

const showCharactersInfo = ref<Filter>('grid');

const sort = computed(() => {
  return store.state.sortValue;
});
const charactersCard = computed(() => {
  return store.state.characters;
});
const charsBackup = computed(() => {
  return store.state.charactersBackup;
});

const router = useRouter();
const store = useStore();

router.beforeResolve((to, from) => {
  if (showCharactersInfo.value === 'list' && to.name !== 'character') {
    showCharactersInfo.value = 'grid';
    store.dispatch('updateSortPage', false);
    router.replace({
      name: 'characters',
      params: { number: store.state.actualPage },
    });
  }
});

function handleSortGrid() {
  store.dispatch('updateSortPage', !sort.value);
  if (sort.value) {
    const sorted = charactersCard.value.sort((a: Card, b: Card) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    store.dispatch('updateChars', [...sorted]);
  } else {
    // charactersCard.value = [...charactersBackup.value];
    store.dispatch('updateChars', [...charsBackup.value]);
  }
}

function handleSelectGrid() {
  router.replace({
    name: 'characters',
    params: { number: store.state.actualPage },
  });
  showCharactersInfo.value = 'grid';
}
</script>
