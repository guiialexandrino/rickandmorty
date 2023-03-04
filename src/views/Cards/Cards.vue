<template>
  <div>
    <Transition mode="out-in">
      <div v-if="loadingDone">
        <Logo />
        <CardsView :characters="charactersCard" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { connectApi } from '../../utils/connectApi';

import type { Card } from '../../types/Cards';

import CardsView from '@/components/Cards/CardsView.vue';
import Logo from '@/components/Logo/Logo.vue';

const count = ref(0);
const pages = ref(0);
const loadingDone = ref(false);
const charactersCard = ref<Card[]>([]);

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

    loadingDone.value = true;
  });
}
</script>
