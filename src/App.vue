<template>
  <div class="header">
    <button
      v-for="(item, index) of routers"
      :key="index"
      @click="router.change(item.name)"
    >
      {{ item.name }}
    </button>
  </div>
  <component :is="router.component"></component>
</template>

<script setup lang="ts">
import { routers, router } from "./router";
</script>
<style>
.header {
  display: flex;
  gap: 10px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
