<template>
  <section>
    <Nav> Exibindo Lista</Nav>
    <div v-for="(identificator, index) in list" :key="index" class="_listChars">
      <h4>{{ identificator.letter }}</h4>
      <div class="text-h6 _char" v-for="char in identificator.characters">
        <span>{{ char.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';
import type { List } from '@/types/List';
import type { PropType } from 'vue';

import { computed } from 'vue';

import Nav from '../Nav/Nav.vue';

const props = defineProps({
  characters: { type: Array as PropType<Card[]>, required: true },
});

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
</script>

<style scoped lang="less" src="./CardsList.less" />
