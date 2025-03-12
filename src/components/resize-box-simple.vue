<template>
  <div
    ref="resizeBoxRef"
    class="resizable-box"
    :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }"
  >
    <div class="resize-handle" @mousedown="startResize"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const resizeBoxRef = ref<HTMLElement>();
const rect = ref<DOMRect>();
onMounted(() => {
  rect.value = resizeBoxRef.value?.getBoundingClientRect();
});

// 定义初始宽高
const boxWidth = ref(200);
const boxHeight = ref(200);

// 定义调整大小的状态
let isResizing = false;

const onMouseMove = (e: MouseEvent) => {
  if (isResizing) {
    boxWidth.value = e.clientX - rect.value!.left;
    boxHeight.value = e.clientY - rect.value!.top;
    rect.value = resizeBoxRef.value?.getBoundingClientRect();
    debugger;
  }
};

const onMouseUp = () => {
  isResizing = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
};

// 开始调整大小
function startResize(event: MouseEvent) {
  isResizing = true;

  // 监听鼠标移动和释放事件
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}
</script>

<style scoped>
.resizable-box {
  position: relative;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  overflow: hidden;
}

.resize-handle {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  cursor: se-resize;
}

.resizable-box:hover .resize-handle {
  display: block;
}
</style>
