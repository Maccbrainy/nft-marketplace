import { createRouter, createWebHistory } from "vue-router";
import TheHomePageView from "../pages/TheHomePageView.vue";
import TableAssetsTable from "../components/TableAssetsTable.vue";
import CollectionActivity from "../components/TableActivity.vue";

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
      path: "/:id/:slug?",
      // name: "CollectionPage",
      // route level code-splitting
      // this generates a separate chunk (TheCollectionPageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheCollectionPageView.vue"),
      props: true,
      children: [
        {
          path: "",
          name: "TableAssets",
          component: TableAssetsTable,
        },
        {
          path: "activity",
          name: "Activity",
          component: CollectionActivity,
        },
      ],
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
