import LoadingTest from "./components/loading-test.vue";
import ResizeBox from "./components/resize-box.vue";
import CanvasCard from "./components/canvas-card.vue";

import { computed, reactive, ref } from "vue";
import Home from "./components/home.vue";

export const routers = [
  {
    component: LoadingTest,
    name: "loading-test",
  },
  {
    component: ResizeBox,
    name: "resize-box",
  },
  {
    component: CanvasCard,
    name: "canvas-card",
  },
  {
    component: Home,
    name: "home",
  },
];

const current = ref("home");
const component = computed(() => {
  return routers.find((item) => item.name === current.value)?.component;
});
function change(name: string) {
  current.value = name;
}

export const router = reactive({ current, component, change });
