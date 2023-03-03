<template>
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
import { RouterView } from 'vue-router';
import Header from './components/Header/Header.vue';
</script>
