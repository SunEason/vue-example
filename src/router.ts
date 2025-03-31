import { computed, defineAsyncComponent, reactive, ref } from "vue";

export const routers = [
  {
    component: defineAsyncComponent(
      () => import("./components/loading-test.vue")
    ),
    name: "loading-test",
  },
  {
    component: defineAsyncComponent(
      () => import("./components/resize-box.vue")
    ),
    name: "resize-box",
  },
  {
    component: defineAsyncComponent(
      () => import("./components/canvas-card.vue")
    ),
    name: "canvas-card",
  },
  {
    component: defineAsyncComponent(
      () => import("./components/pull-refresh-demo.vue")
    ),
    name: "pull-refresh-demo",
  },
  {
    component: defineAsyncComponent(() => import("./components/home.vue")),
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
