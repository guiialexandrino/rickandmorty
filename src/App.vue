<template>
  <Transition>
    <Loading v-if="isLoading" />
  </Transition>
  <Header />
  <div class="row justify-center items-center _contentHeight_">
    <div class="col q-px-md _content_">
      <RouterView v-slot="{ Component }">
        <Transition mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import Header from './components/Header/Header.vue';
import Loading from './components/Loading/Loading.vue';

const store = useStore();
const $q = useQuasar();

const isLoading = computed(() => {
  return store.state.loading;
});

onBeforeMount(() => {
  const data: any = $q.sessionStorage.getItem('chars');
  let chars = [];
  if (data) {
    chars = [...data];
    store.dispatch('updateChars', [...chars]);
    store.dispatch('updateCharsBackup', [...chars]);
  }
});
</script>
