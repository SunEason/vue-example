<template>
  <div
    class="refresh-container"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- 下拉提示区域 -->
    <div class="refresh-header" :style="{ height: headerHeight + 'px' }">
      <span v-if="!isRefreshing">{{ refreshText }}</span>
      <span v-else>正在刷新...</span>
    </div>

    <!-- 内容区域 -->
    <div
      class="content"
      :style="{ transform: `translateY(${headerHeight}px)` }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<
  (event: 'refresh', done: () => void)
>();

const startY = ref(0); // 触摸起点的 Y 坐标
const currentY = ref(0); // 当前触摸点的 Y 坐标
const isPulling = ref(false); // 是否正在下拉
const isRefreshing = ref(false); // 是否正在刷新
const headerHeight = ref(0); // 下拉头部的高度
const refreshText = ref("下拉刷新"); // 提示文字

const onTouchStart = (event: TouchEvent) => {
  startY.value = event.touches[0].pageY;
  isPulling.value = true;
};

const onTouchMove = (event: TouchEvent) => {
  if (!isPulling.value) return;

  currentY.value = event.touches[0].pageY;
  const deltaY = currentY.value - startY.value;

  // 只有在下拉且内容未滚动到顶部时才允许下拉
  if (deltaY > 0 && headerHeight.value === 0) {
    headerHeight.value = Math.min(deltaY / 2, 100); // 控制下拉的最大高度
    refreshText.value = headerHeight.value > 50 ? "释放刷新" : "下拉刷新";
  }
};

const onTouchEnd = () => {
  isPulling.value = false;

  // 如果下拉高度超过阈值，则触发刷新
  if (headerHeight.value > 50) {
    isRefreshing.value = true;
    headerHeight.value = 50; // 固定刷新中的高度
    triggerRefresh();
  } else {
    // 否则回弹到初始状态
    resetHeader();
  }
};

const triggerRefresh = () => {
  emit("refresh", () => {
    // 刷新完成后回调
    isRefreshing.value = false;
    refreshText.value = "下拉刷新";
    resetHeader();
  });
};

const resetHeader = () => {
  headerHeight.value = 0;
};
</script>

<style scoped>
.refresh-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.refresh-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  transition: height 0.3s ease;
}

.content {
  transition: transform 0.3s ease;
}
</style>
