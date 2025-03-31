<template>
  <pullRefresh @refresh="handleRefresh">
    <div v-for="(item, index) in items" :key="index">{{ item }}</div>
  </pullRefresh>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import pullRefresh from "./pull-refresh.vue";

const items = ref(["Item 1", "Item 2", "Item 3"]);
function handleRefresh(done: () => void) {
  setTimeout(() => {
    items.value = ["New Item 1", "New Item 2", "New Item 3"];
    done(); // 调用回调完成刷新
  }, 1000);
}
</script>
