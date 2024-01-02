import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

// import Toast from "vue-toastification";
// import "vue-toastification/dist/index.css";
// const app = createApp(App);
// app.use(Toast, {
//   transition: "Vue-Toastification__bounce",
//   maxToasts: 3,
//   newestOnTop: true,
//   filterBeforeCreate: (toast, toasts) => {
//     if (toasts.length >= 3) {
//       toasts.splice(0, 1);
//     }
//     return toast;
//   },
// });

createApp(App).mount("#app");
