<template>
  <div
    ref="resizeBoxRef"
    class="resizable-box"
    :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }"
  >
    <div class="resize-handle top-left"></div>
    <div class="resize-handle top"></div>
    <div class="resize-handle top-right"></div>
    <div class="resize-handle right"></div>
    <div class="resize-handle bottom-right"></div>
    <div class="resize-handle bottom"></div>
    <div class="resize-handle bottom-left"></div>
    <div class="resize-handle left"></div>
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
onMounted(() => {
  const resizeHandles = document.getElementsByClassName("resize-handle");

  Array.from(resizeHandles).forEach((handle) => {
    handle.addEventListener("mousedown", startResize);
  });
});
</script>

<style scoped>
.resizable-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  display: none;
  background-color: #007bff;
}

.resizable-box:hover .resize-handle {
  display: block;
}

.top-left {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.top {
  top: -5px;
  left: calc(50% - 5px);
  cursor: ns-resize;
}

.top-right {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.right {
  top: calc(50% - 5px);
  right: -5px;
  cursor: ew-resize;
}

.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.bottom {
  bottom: -5px;
  left: calc(50% - 5px);
  cursor: ns-resize;
}

.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.left {
  top: calc(50% - 5px);
  left: -5px;
  cursor: ew-resize;
}
</style>
