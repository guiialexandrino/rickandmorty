<template>
  <div ref="component" class="search">
    <input
      type="text"
      id="show-poke-list"
      placeholder="Search Character"
      autocomplete="off"
      @keyup="autoComplete"
      v-model="model.name"
    />
    <span class="search-icon"></span>
    <ul ref="list" class="list"></ul>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Cards';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ClickOutside from './ClickOutside';

const store = useStore();
const router = useRouter();

const model = ref<Card>({ name: '', id: '', image: '' });
const chars = ref<Card[]>([]);
const list = ref<HTMLUListElement | null>(null);
const component = ref<HTMLDivElement | null>(null);

const filterOptions = computed(() => {
  return [...store.state.characters].map((char: Card) => {
    return {
      name: `${char.name} - #${char.id}`,
      id: char.id,
      image: char.image,
    };
  });
});

ClickOutside(component, () => {
  removeElements();
});

function autoComplete() {
  chars.value = [...filterOptions.value];
  removeElements();

  let maxResults = 0;

  if (model.value.name.length > 1) {
    for (let i of chars.value) {
      //convert input to lowercase and compare with each string
      if (
        i.name.toLowerCase().startsWith(model.value?.name.toLowerCase()) &&
        model.value?.name != '' &&
        maxResults < 6
      ) {
        maxResults++;

        //Display matched part in bold
        let label =
          '<b>' + i.name.substring(0, model.value?.name.length) + '</b>';
        label += i.name.substring(model.value?.name.length);

        const listItem = createList(label);
        listItem.onclick = function () {
          displayNames(i);
        };

        //display the value in array
        listItem.innerHTML = label;
        list.value?.appendChild(listItem);
      }
    }

    const search = chars.value.filter((char: Card) => {
      if (char.name.toLowerCase().includes(model.value?.name)) return char;
    });

    if (search.length > 0) {
      const li = createList(`<b>Ver todos resultados (${search.length})</b>`);
      li.onclick = function () {
        goToSeeAllResults(search);
      };
      list.value?.appendChild(li);
    }
  }
}

function createList(label: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.classList.add('list-items');
  li.innerHTML = label;
  li.style.cursor = 'pointer';

  return li;
}

function displayNames(value: Card) {
  model.value = { ...value };
  const showSearch = chars.value.filter(
    (char: Card) => char.id === model.value?.id && model.value?.name != ''
  );

  chars.value = showSearch;
  router.push({ name: 'character', params: { id: model.value.id } });

  removeElements();
  return [value];
}

function goToSeeAllResults(result: Card[]) {
  console.log(result);
}

function removeElements() {
  let items = document.querySelectorAll('.list-items');
  items.forEach((item) => {
    item.remove();
  });
}
</script>

<style lang="less" src="./Search.less" />
