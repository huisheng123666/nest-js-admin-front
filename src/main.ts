import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import { setupPinia } from "./store";
import "@/common/css/reset.css";
import "element-plus/dist/index.css";

function bootstrap() {
  const app = createApp(App);

  setupPinia(app);

  app.use(router);
  app.use(ElementPlus);

  app.mount("#app");
}

bootstrap();
