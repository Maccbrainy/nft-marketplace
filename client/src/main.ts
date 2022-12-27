import { createApp } from "vue";
import App from "./App.vue";
import provider from "./provider";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);
app.use(provider);
app.use(router);
app.mount("#app");
