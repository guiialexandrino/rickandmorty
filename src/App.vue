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
import { computed } from 'vue';
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import Header from './components/Header/Header.vue';
import Loading from './components/Loading/Loading.vue';

const store = useStore();

const isLoading = computed(() => {
  return store.state.loading;
});
</script>
