import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import components from "@/components/UI";
import directives from "@/directives";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});
directives.forEach((directives) => {
  app.directive(directives.name, directives);
});
app.use(router).mount("#app");
