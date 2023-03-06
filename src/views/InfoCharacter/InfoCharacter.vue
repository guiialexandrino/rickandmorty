<template>
  <div v-if="loadingDone" class="_minHeight_">
    <Logo />
    <section>
      <Nav @handle-click="backToCharacters"> {{ navTitle }}</Nav>
      <div v-if="notFoundError" class="q-pt-xl _error">
        <div ref="notFound" class="_error">
          <h3>Oops.. could not find this character! :(</h3>
        </div>
      </div>
      <div v-else class="_charInfo row justify-center items-center">
        <div class="col-12 q-mb-md"><img :src="char?.image" /></div>
        <div class="col-12">
          <h3># {{ char?.name }}</h3>
        </div>
        <div class="col-12 maxInfo">
          <div class="row q-mt-xs q-mb-lg q-gutter-y-lg justify-center">
            <!-- Info  -->
            <div class="col-12"><h4>Info</h4></div>
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
              <strong>Gender</strong>
              <br />
              <span>{{ char?.gender }}</span>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
              <strong>Specie:</strong>
              <br />
              <span>{{ char?.species }}</span>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
              <strong>Status:</strong>
              <br />
              <span>{{ char?.status ? char.status : '-' }}</span>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3">
              <strong>Type:</strong>
              <br />
              <span>{{ char?.type ? char.type : '-' }}</span>
            </div>
            <!-- Origin  -->
            <div class="col-12"><h4>Origin</h4></div>
            <div
              v-for="(origin, attribute) in char?.origin"
              class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3"
            >
              <strong>
                {{ capitalizeStrings(attribute) }}
              </strong>
              <br />
              <span>{{ origin ? origin : '-' }}</span>
            </div>
            <!-- Location  -->
            <div class="col-12"><h4>Location</h4></div>
            <div
              v-for="(location, attribute) in char?.location"
              class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3"
            >
              <strong>
                {{ capitalizeStrings(attribute) }}
              </strong>
              <br />
              <span>{{ location ? location : '-' }}</span>
            </div>
            <!-- Episodes  -->
            <div class="col-12"><h4>Appears in the eps</h4></div>
            <ul>
              <li v-for="ep in char?.episode">
                <span>
                  {{ ep.episode }}
                  <q-tooltip
                    :offset="[0, 5]"
                    :transition-show="'fade'"
                    class="bg-black text-primary text-body1"
                    anchor="bottom end"
                    self="top middle"
                    >{{ ep.name }}</q-tooltip
                  >
                </span>
              </li>
            </ul>
          </div>
        </div>
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

import type { Character } from '../../types/Character';

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
  if (notFoundError.value) return 'Not found';
  else return char.value?.name;
});

const char = ref<Character>();

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
      if (result.data.character === null) throw Error;
      console.log(result.data.character);
      char.value = result.data.character;
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

function capitalizeStrings(item: string) {
  let capitalized = '';
  capitalized =
    item.substring(0, 1).toUpperCase() + item.substring(1, item.length);

  return capitalized;
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
