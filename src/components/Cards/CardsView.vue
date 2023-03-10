<template>
  <section v-if="actualPage">
    <Nav @handle-click="actualPage = 1">
      Showing page {{ actualPage }}
      <span class="q-ml-md text-h6">{{
        sort ? '(Alphabetical order)' : ''
      }}</span>
    </Nav>

    <div ref="cards" class="row q-py-md justify-center _structure">
      <div
        class="row justify-center _cardView"
        v-for="card in showCards"
        :key="card.id"
        @click="goToCharacterDetails(card.id)"
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
          active-color="secondary"
          active-text-color="primary"
          size="17px"
          boundary-numbers
          boundary-links
          icon-first="chevron_left"
          icon-last="chevron_right"
        />
      </div>
      <div class="col-12 text-body1 q-mt-md">
        Showing page {{ actualPage }} of {{ numberOfPages }}
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Nav from '../Nav/Nav.vue';

const props = defineProps({
  characters: { type: Array as PropType<Card[]>, required: true },
  sort: { type: Boolean, required: true },
});
const router = useRouter();
const store = useStore();

const cards = ref<HTMLDivElement | null>(null);
const actualPage = ref(1);
const maxPerPage = ref(15);
const maxPagesPagination = ref(20);
const numberOfPages = ref(0);
const showCards = computed(() => {
  const chars = [...props.characters];
  return generatePagination(chars);
});
const sort = computed(() => {
  return props.sort;
});

/*Hooks */

onBeforeMount(() => {
  window.addEventListener('resize', paginationLimit);
});

onUnmounted(() => {
  window.removeEventListener('resize', paginationLimit);
});

onMounted(() => {
  const page = store.state.actualPage;
  if (page && page <= numberOfPages.value) {
    actualPage.value = page;
  } else {
    router.push({ name: 'home' });
  }
  paginationLimit();
});

watch(actualPage, () => {
  if (actualPage.value) store.dispatch('updateActualPage', actualPage.value);
  const url = window.location.href.split('/');
  url.pop();
  const newPath = url.join('/') + `/${actualPage.value}`;
  window.history.pushState({}, '', new URL(newPath));
  window.scrollTo({ top: 0, behavior: 'smooth' });

  fadeInCards();
});

watch(sort, () => {
  fadeInCards();
});

router.beforeResolve((to, from) => {
  actualPage.value = Number(to.params.number);
});

/* Functions */

function goToCharacterDetails(id: string) {
  if (id && id !== undefined)
    router.push({ name: 'character', params: { id: id } });
  else console.log('deu erro');
}

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
    maxPerPage.value = 5;
    maxPagesPagination.value = 5;
  } else {
    maxPerPage.value = 15;
    maxPagesPagination.value = 20;
  }
}

function generateSizeName(name: String) {
  if (name.length > 18)
    return 'font-size: 1.25rem !important; line-height: 1.5rem !important';
  else return '';
}

function fadeInCards() {
  if (cards.value) {
    cards.value.style.animation = 'fadeIn 1000ms';
    setTimeout(() => {
      if (cards.value) cards.value.style.animation = '';
    }, 500);
  }
}
</script>

<style scoped lang="less" src="./CardsView.less" />
