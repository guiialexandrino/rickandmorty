<template>
  <Transition>
    <Loading v-if="isLoading" />
  </Transition>
  <div v-if="loadingDone" class="_animationAppear_">
    <Header />
    <div class="row justify-center items-center _contentHeight_">
      <div class="col q-px-md _content_">
        <RouterView v-slot="{ Component }" :key="route.fullPath">
          <Transition mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from './types/Cards';
import { QUERY_PAGES, QUERY_CHARACTERS, connectApi } from './utils/connectApi';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import Header from './components/Header/Header.vue';
import Loading from './components/Loading/Loading.vue';

const store = useStore();
const route = useRoute();
const $q = useQuasar();
const isLoading = computed(() => {
  return store.state.loading;
});
const loadingDone = ref(false);

onBeforeMount(() => {
  const data: any = $q.sessionStorage.getItem('chars');
  if (data) {
    store.dispatch('updateChars', [...data]);
    store.dispatch('updateCharsBackup', [...data]);
  }
});

onMounted(async () => {
  const data: any = $q.sessionStorage.getItem('chars');
  if (!data) await init();
  else loadingDone.value = true;
});

async function init() {
  store.dispatch('loadingInit');
  connectApi(QUERY_PAGES).then(async (result) => {
    let pages = 0;
    pages = result.data.characters.info.pages;
    const charactersPromises = [];
    const charactersCard: Card[] = [];
    let loadingValueProcess = 0;

    for (let i = 1; i <= pages; i++) {
      charactersPromises.push(
        connectApi(QUERY_CHARACTERS(i), () => {
          loadingValueProcess = loadingValueProcess + 1;

          const updateLoading = Math.round((loadingValueProcess / pages) * 100);

          store.dispatch('updateLoadingProcess', updateLoading);
        })
      );
    }

    await Promise.all(charactersPromises).then((characters) => {
      characters.forEach((array) => {
        array.data.characters.results.forEach((item: Card) => {
          charactersCard.push(item);
        });
      });
    });

    $q.sessionStorage.set('chars', [...charactersCard]);
    store.dispatch('updateChars', [...charactersCard]);
    store.dispatch('updateCharsBackup', [...charactersCard]);
    store.dispatch('loadingDone');
    store.dispatch('updateLoadingProcess', 0);
    loadingDone.value = true;
  });
}
</script>
