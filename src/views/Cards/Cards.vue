<template>
  <div class="_minHeight_">
    <Transition mode="out-in">
      <div v-if="loadingDone">
        <Logo />
        <FilterOptions
          @sort-grid="handleSortGrid"
          @grid-view="showCharactersInfo = 'grid'"
          @list-view="showCharactersInfo = 'list'"
        />
        <Transition mode="out-in">
          <CardsView
            v-if="showCharactersInfo === 'grid'"
            :characters="charactersCard"
            :sort="sort"
          />
        </Transition>
        <Transition mode="out-in">
          <CardsList
            v-if="showCharactersInfo === 'list'"
            :characters="charactersCard"
          />
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { connectApi } from '../../utils/connectApi';

import type { Card } from '../../types/Cards';
import type Filter from '../../types/Filter';

import CardsView from '@/components/Cards/CardsView.vue';
import CardsList from '@/components/Cards/CardsList.vue';
import Logo from '@/components/Logo/Logo.vue';
import FilterOptions from '@/components/FilterOptions/FilterOptions.vue';

const count = ref(0);
const pages = ref(0);
const loadingDone = ref(false);
const sort = ref(false);
const charactersCard = ref<Card[]>([]);
const charactersBackup = ref<Card[]>([]);
const showCharactersInfo = ref<Filter>('grid');

onMounted(() => {
  init();
});

async function init() {
  connectApi(`characters{
    info {
      count
      pages
    }
  }`).then(async (result) => {
    count.value = result.data.characters.info.count;
    pages.value = result.data.characters.info.pages;
    const charactersPromises = [];

    for (let i = 1; i <= pages.value; i++) {
      charactersPromises.push(
        connectApi(`characters(page: ${i}){
          results {
            id
            name
            image
          }
        }`)
      );
    }

    await Promise.all(charactersPromises).then((characters) => {
      characters.forEach((array) => {
        array.data.characters.results.forEach((item: Card) => {
          charactersCard.value.push(item);
        });
      });
    });

    charactersBackup.value = [...charactersCard.value];
    loadingDone.value = true;
  });
}

function handleSortGrid() {
  sort.value = !sort.value;
  if (sort.value) {
    charactersCard.value.sort((a: Card, b: Card) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  } else {
    charactersCard.value = [...charactersBackup.value];
  }
}
</script>
