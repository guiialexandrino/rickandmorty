<template>
  <section>
    <Nav @handle-click="backToCharacters"> Exibindo Lista</Nav>
    <h6>Click na letra desejada:</h6>
    <div class="row q-pb-xl justify-center text-h3">
      <div class="row q-gutter-lg justify-center _index">
        <span v-for="(identificator, index) in list" :key="index">
          <strong
            :class="idLastClick === index && `_selected`"
            @click="goTo(index)"
          >
            {{ identificator.letter }}
          </strong>
        </span>
      </div>
    </div>

    <div
      ref="idLetters"
      :id="String(index)"
      v-for="(identificator, index) in list"
      :key="index"
      class="_listChars"
    >
      <h3 :class="idLastClick === index && `_selected`">
        {{ identificator.letter }}
      </h3>
      <ul>
        <li
          class="text-subtitle1 _char"
          v-for="char in identificator.characters"
        >
          <span @click="goToCharPage(char.id)">
            {{ splitString ? `${char.name.substring(0, 10)}...` : char.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="_backToTop">
      <q-btn
        :size="'1.3em'"
        round
        text-color="primary"
        color="secondary"
        icon="arrow_upward"
        @click="backToTop"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';
import type { List } from '@/types/List';
import type { PropType } from 'vue';

import { computed, onBeforeMount, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Nav from '../Nav/Nav.vue';

const props = defineProps({
  characters: { type: Array as PropType<Card[]>, required: true },
});

const router = useRouter();
const splitString = ref(false);
const idLetters = ref<HTMLDivElement[] | null>([]);
const idLastClick = ref(0);

const list = computed(() => {
  let orderedList: List[] = [];

  props.characters.forEach((character: Card) => {
    const firstChar = character.name.substring(0, 1);

    if (Number(firstChar)) checkList(orderedList, character);
    else checkList(orderedList, character, firstChar);
  });

  return orderedList.sort((a: List, b: List) => {
    if (a.letter > b.letter) {
      return 1;
    }
    if (a.letter < b.letter) {
      return -1;
    }
    return 0;
  });
});

function checkList(list: List[], character: Card, label: String = '0-9') {
  const check = list.find((item) => {
    return item.letter === label;
  });
  if (!check) {
    list.push({ letter: label, characters: [{ ...character }] });
  } else {
    check.characters.push({ ...character });
  }
}

function backToCharacters() {
  router.push({ name: 'characters', params: { number: 0 } });
}

function goTo(id: any) {
  if (idLetters.value) {
    idLastClick.value = id;
    idLetters.value[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToCharPage(id: string) {
  if (id) router.push({ name: 'character', params: { id: id } });
}

onBeforeMount(() => {
  window.addEventListener('resize', splitCharName);
});

onUnmounted(() => {
  window.removeEventListener('resize', splitCharName);
});

function splitCharName() {
  if (window.innerWidth < 600) {
    splitString.value = true;
  } else {
    splitString.value = false;
  }
}
</script>

<style scoped lang="less" src="./CardsList.less" />
