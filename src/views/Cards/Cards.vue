<template>
  <div class="_minHeight_">
    <Transition mode="out-in">
      <div v-if="loadingDone">
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
          <CardsList v-if="showCharactersInfo === 'list'" :characters="chars" />
        </Transition>
        <Transition mode="out-in">
          <CardsView
            v-if="showCharactersInfo === 'grid'"
            :characters="chars"
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
import { onMounted, ref, computed } from 'vue';
import {
  connectApi,
  QUERY_PAGES,
  QUERY_CHARACTERS,
} from '../../utils/connectApi';
import { useQuasar } from 'quasar';

import type { Card } from '../../types/Cards';
import type Filter from '../../types/Filter';

import CardsView from '@/components/Cards/CardsView.vue';
import CardsList from '@/components/Cards/CardsList.vue';
import Logo from '@/components/Logo/Logo.vue';
import FilterOptions from '@/components/FilterOptions/FilterOptions.vue';
import Search from '@/components/Search/Search.vue';

const $q = useQuasar();
const count = ref(0);
const pages = ref(0);
const loadingDone = ref(false);
const sort = ref(false);
const showCharactersInfo = ref<Filter>('grid');
const loadingValueProcess = ref(0);
const charactersCard = ref<Card[]>([]); //only inside Component
const chars = computed(() => {
  return store.state.characters;
});
const charsBackup = computed(() => {
  return store.state.charactersBackup;
});

const router = useRouter();
const store = useStore();

onMounted(() => {
  if (chars.value.length > 0) {
    loadingDone.value = true;
    charactersCard.value = [...chars.value];
    // charactersBackup.value = [...chars.value];
    return;
  }
  init();
});

async function init() {
  store.dispatch('loadingInit');
  connectApi(QUERY_PAGES).then(async (result) => {
    count.value = result.data.characters.info.count;
    pages.value = result.data.characters.info.pages;
    const charactersPromises = [];

    for (let i = 1; i <= pages.value; i++) {
      charactersPromises.push(
        connectApi(QUERY_CHARACTERS(i), () => {
          loadingValueProcess.value = loadingValueProcess.value + 1;

          const updateLoading = Math.round(
            (loadingValueProcess.value / pages.value) * 100
          );

          store.dispatch('updateLoadingProcess', updateLoading);
        })
      );
    }

    await Promise.all(charactersPromises).then((characters) => {
      characters.forEach((array) => {
        array.data.characters.results.forEach((item: Card) => {
          charactersCard.value.push(item);
        });
      });
    });

    $q.sessionStorage.set('chars', [...charactersCard.value]);
    store.dispatch('updateChars', [...charactersCard.value]);
    store.dispatch('updateCharsBackup', [...charactersCard.value]);
    store.dispatch('loadingDone');
    store.dispatch('updateLoadingProcess', 0);
    loadingDone.value = true;
  });
}

router.beforeResolve((to, from) => {
  if (showCharactersInfo.value === 'list' && to.name !== 'character') {
    showCharactersInfo.value = 'grid';
    sort.value = false;
    router.replace({
      name: 'characters',
      params: { number: store.state.actualPage },
    });
  }
});

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
    store.dispatch('updateChars', [...charactersCard.value]);
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
