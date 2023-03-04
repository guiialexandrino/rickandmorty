<template>
  <div>
    <div class="row q-py-md justify-center _structure">
      <div
        class="row justify-center _cardView"
        v-for="card in showCards"
        :key="card.id"
      >
        <div
          class="_avatar"
          :style="`background-image: url('${card.image}')`"
        ></div>
        <div class="q-mt-sm _name">
          <h3 :style="generateSizeName(card.name)">{{ card.name }}</h3>
        </div>
      </div>
    </div>
    <button @click="actualPage++">Aumenta pagina</button>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';
import type { PropType } from 'vue';
import { ref, computed } from 'vue';

const actualPage = ref(1);
const maxPerPage = ref(20);
const numberOfPages = ref(0);

const props = defineProps({
  characters: { type: Array as PropType<Card[]>, required: true },
});

// console.log(props.characters[0]);

const showCards = computed(() => {
  return generatePagination([...props.characters]);
});

const showCardName = computed(() => {
  return;
});

function generatePagination(characters: Card[]) {
  let content = [];
  numberOfPages.value = Math.ceil(characters.length / maxPerPage.value);
  let count = actualPage.value * maxPerPage.value - maxPerPage.value;
  const delimiter = count + maxPerPage.value;
  if (actualPage <= numberOfPages) {
    for (let i = count; i < delimiter; i++) {
      characters[i] && content.push(characters[i]);
      characters[i] && count++;
    }
  }
  return content;
}

function generateSizeName(name: String) {
  if (name.length > 20) return 'font-size: 1.25rem !important';
  else return '';
}
</script>

<style scoped lang="less" src="./CardsView.less" />
