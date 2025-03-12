<template>
  <div>
    <div
      v-loading="isLoading"
      style="
        position: relative;
        width: 300px;
        height: 200px;
        border: 1px solid #ccc;
      "
    >
      <p>这里是内容区域</p>
    </div>

    <button @click="toggleLoading">切换加载状态</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isLoading = ref(false); // 控制加载状态

function toggleLoading() {
  isLoading.value = !isLoading.value;
}
</script>
