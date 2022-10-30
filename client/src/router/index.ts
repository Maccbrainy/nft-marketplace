import { createRouter, createWebHistory } from "vue-router";
import TheHomePageView from "../pages/TheHomePageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: TheHomePageView,
      meta: {
        title: "Cryptop NFT Market Place",
      },
    },
    {
      path: "/:slug",
      name: "CollectionPage",
      // route level code-splitting
      // this generates a separate chunk (TheCollectionPageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheCollectionPageView.vue"),
      meta: {
        title: "Create Your NFT",
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
