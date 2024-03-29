import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";
// Above the createApp() line
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
library.add(faChevronLeft);
import "vant/lib/index.css";
import { Cell, Popup, Field, Button, ConfigProvider, CellGroup } from "vant";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(Cell)
  .use(Popup)
  .use(Field)
  .use(Button)
  .use(CellGroup)
  .use(ConfigProvider)
  .component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
  app.mount("#app");
});
