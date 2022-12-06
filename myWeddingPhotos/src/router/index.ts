import { createRouter, createWebHistory } from "vue-router";
import PhotosView from "../views/PhotosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "photo",
      component: PhotosView,
    },
  ],
});

export default router;
