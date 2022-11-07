import { createRouter, createWebHistory } from "vue-router";
import TheHomePageView from "../pages/TheHomePageView.vue";
import TableFiltersAssets from "../components/TableFiltersAssets.vue";
import CollectionActivity from "../components/TableActivity.vue";
import TokenOverView from "../components/TokenOverView.vue";
import TokenBids from "../components/TokenBids.vue";
import TokenHistory from "../components/TokenHistory.vue";

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
          name: "TableCollectionAssets",
          component: TableFiltersAssets,
        },
        {
          path: "activity",
          name: "CollectionActivity",
          component: CollectionActivity,
        },
      ],
    },
    {
      path: "/create",
      name: "CreatePage",
      // route level code-splitting
      // this generates a separate chunk (TheCreatePageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheCreatePageView.vue"),
    },
    {
      path: "/token/:tokenId/:tokenslug?",
      // name: "TokenPage",
      // route level code-splitting
      // this generates a separate chunk (TheTokenPageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheTokenPageView.vue"),
      children: [
        {
          path: "",
          name: "TokenOverView",
          component: TokenOverView,
        },
        {
          path: "bids",
          name: "TokenBids",
          component: TokenBids,
        },
        {
          path: "history",
          name: "TokenHistory",
          component: TokenHistory,
        },
      ],
    },
  ],
});

export default router;
