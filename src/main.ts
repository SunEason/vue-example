import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import loadingDirective from "./directive/loading";

const app = createApp(App);

// directive 注册
app.use(loadingDirective);

app.mount("#app");
