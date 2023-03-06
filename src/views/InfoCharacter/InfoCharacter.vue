<template>
  <div v-if="loadingDone" class="_minHeight_">
    <Logo />
    <section>
      <Nav @handle-click="backToCharacters"> {{ navTitle }}</Nav>
      <div v-if="notFoundError" class="q-pt-xl _error">
        <div ref="notFound" class="_error">
          <h3>Ops.. não foi possível encontrar esse personagem! :(</h3>
        </div>
      </div>
      <div v-else>
        <h3>Info personagem</h3>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { connectApi } from '../../utils/connectApi';

import Logo from '@/components/Logo/Logo.vue';
import Nav from '@/components/Nav/Nav.vue';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const loadingDone = ref(false);
const notFound = ref<HTMLDivElement | null>(null);
const notFoundError = ref(false);
const actualPage = computed(() => {
  return store.state.actualPage;
});
const navTitle = computed(() => {
  if (notFoundError.value) return 'Não encontrado';
  else return 'Nome';
});

onMounted(() => {
  loadCharInfo();
});

function loadCharInfo() {
  store.dispatch('updateLoadingShowProcess', false);
  store.dispatch('loadingInit');

  connectApi(`
    character(id: ${route.params.id}) {
    id
    name
    image
    gender
    species
    status
    type
    location {
      dimension
      name
      type
    }
    origin {
      dimension
      name
      type
    }
    episode {
      episode
      name
    }
  }`)
    .then((result) => {
      console.log(result.data.character);
      store.dispatch('loadingDone');
      store.dispatch('updateLoadingShowProcess', true);
      loadingDone.value = true;
    })
    .catch(() => {
      loadingDone.value = true;
      notFoundError.value = true;
      store.dispatch('loadingDone');
      store.dispatch('updateLoadingShowProcess', true);
      noSearchFound();
    });
}

function noSearchFound() {
  setTimeout(() => {
    if (notFound.value) {
      const subtract =
        window.innerHeight -
        (notFound.value.offsetTop + notFound.value.clientHeight + 100);
      notFound.value.style.minHeight = `${subtract}px`;
    }
  }, 100);
  // console.log(notFound.value.offsetTop);
}

function backToCharacters() {
  router.push({ name: 'characters', params: { number: actualPage.value } });
}
</script>

<style scoped lang="less" src="./InfoCharacter.less" />
