import { createRouter, createWebHistory } from "vue-router";
import HomePageView from "../pages/TheHomePageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePageView,
      meta: {
        title: "Cryptop NFT Market Place",
      },
    },
    {
      path: "/create",
      name: "CreatePage",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheCreatePageView.vue"),
      meta: {
        title: "Create Your NFT",
      },
    },
  ],
});

export default router;
