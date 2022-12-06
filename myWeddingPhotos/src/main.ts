import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";

import "@/configs/element-theme.scss";
import "@/configs/default.scss";

import "./assets/main.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });

app.use(createPinia());
app.use(router);

app.mount("#app");
