<template>
  <div>
    <Transition mode="out-in">
      <div v-if="loadingDone">
        <img src="../../assets/images/Logo.png" class="imageSize" />
        <br />
        <p>{{ charactersEspecies }}</p>
        <p>{{ count }}</p>
        <p>{{ pages }}</p>
        <br />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { connectApi } from '../../utils/connectApi';

import type { Card } from '../../types/Cards';

const count = ref(0);
const pages = ref(0);
const loadingDone = ref(false);
const charactersCard = ref<Card[]>([]);
const charactersEspecies = ref<string[]>([]);

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
            species
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

      charactersCard.value.forEach((card: Card) => {
        if (!charactersEspecies.value.includes(card.species))
          charactersEspecies.value.push(card.species);
      });
    });

    loadingDone.value = true;
  });
}
</script>

<style scoped lang="less" src="./Cards.less" />
