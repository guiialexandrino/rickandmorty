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
import { useStore } from 'vuex';
import ClickOutside from './ClickOutside';

const store = useStore();

const model = ref<Card>({ name: '', id: '', image: '' });
const list = ref<HTMLUListElement | null>(null);
const component = ref<HTMLDivElement | null>(null);
ClickOutside(component, () => {
  removeElements();
});

let newArray = [...store.state.characters];

const filterOptions = computed(() => {
  return newArray.map((char: Card) => {
    return {
      name: `${char.name} - #${char.id}`,
      id: char.id,
      image: char.image,
    };
  });
});

const chars = ref<Card[]>([]);
chars.value = [...filterOptions.value];

function autoComplete() {
  chars.value = [...filterOptions.value];
  removeElements();

  let maxResults = 0;

  if (model.value.name.length > 1)
    for (let i of chars.value) {
      //convert input to lowercase and compare with each string

      if (
        i.name.toLowerCase().startsWith(model.value?.name.toLowerCase()) &&
        model.value?.name != '' &&
        maxResults < 12
      ) {
        maxResults++;

        //create li element
        let listItem = document.createElement('li');

        //One common class name
        listItem.classList.add('list-items');
        listItem.style.cursor = 'pointer';
        listItem.onclick = function () {
          displayNames(i);
        };

        //Display matched part in bold
        let word =
          '<b>' + i.name.substring(0, model.value?.name.length) + '</b>';
        word += i.name.substring(model.value?.name.length);

        //display the value in array
        listItem.innerHTML = word;
        list.value?.appendChild(listItem);
      }
    }
}

function displayNames(value: Card) {
  model.value = { ...value };
  const showSearch = chars.value.filter(
    (char: Card) => char.id === model.value?.id && model.value?.name != ''
  );

  chars.value = showSearch;
  console.log(model.value);

  removeElements();
}

function removeElements() {
  let items = document.querySelectorAll('.list-items');
  items.forEach((item) => {
    item.remove();
  });
}
</script>

<style lang="less" src="./Search.less" />
