<template>
  <section>
    <Nav @handle-click="actualPage = 1">Exibindo página {{ actualPage }}</Nav>
    <div ref="cards" class="row q-py-md justify-center _structure">
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
    <div class="column q-my-xl items-center">
      <div class="col-12">
        <q-pagination
          v-model="actualPage"
          :max="numberOfPages"
          :max-pages="maxPagesPagination"
          color="white"
          active-color="primary"
          size="18px"
          boundary-numbers
          boundary-links
          icon-first="chevron_left"
          icon-last="chevron_right"
        />
      </div>
      <div class="col-12 text-h6 q-mt-md">
        Exibindo página {{ actualPage }} de {{ numberOfPages }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';
import type { PropType } from 'vue';
import {
  ref,
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Nav from '../Nav/Nav.vue';

const props = defineProps({
  characters: { type: Array as PropType<Card[]>, required: true },
});
const route = useRoute();
const router = useRouter();

const cards = ref<HTMLDivElement | null>(null);
const actualPage = ref(1);
const maxPerPage = ref(20);
const maxPagesPagination = ref(20);
const numberOfPages = ref(0);
const showCards = computed(() => {
  return generatePagination([...props.characters]);
});

/*Hooks */

onBeforeMount(() => {
  window.addEventListener('resize', paginationLimit);
});

onUnmounted(() => {
  window.removeEventListener('resize', paginationLimit);
});

onMounted(() => {
  const page = Number(route.params.number);
  if (page && page <= numberOfPages.value) {
    actualPage.value = page;
  } else {
    router.push({ name: 'home' });
  }
});

watch(actualPage, () => {
  if (cards.value) {
    const url = window.location.href.split('/');
    url.pop();
    const newPath = url.join('/') + `/${actualPage.value}`;
    window.history.pushState({}, '', new URL(newPath));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    cards.value.style.animation = 'fadeIn 1000ms';
    setTimeout(() => {
      if (cards.value) cards.value.style.animation = '';
    }, 500);
  }
});

router.beforeResolve((to, from) => {
  actualPage.value = Number(to.params.number);
});

/* Functions */

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

function paginationLimit() {
  if (window.innerWidth < 1000) {
    maxPerPage.value = 10;
    maxPagesPagination.value = 5;
  } else {
    maxPerPage.value = 20;
    maxPagesPagination.value = 20;
  }
}

function generateSizeName(name: String) {
  if (name.length > 18)
    return 'font-size: 1.25rem !important; line-height: 1.5rem !important';
  else return '';
}
</script>

<style scoped lang="less" src="./CardsView.less" />
