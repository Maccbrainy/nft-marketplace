import { createRouter, createWebHistory } from "vue-router";
import {
  // TheBlockchainOptionsAndErcTypesPageView,
  // TheCreatePageView,
  TheHomePageView,
} from "../pages";
import { TableFiltersAssets, TableActivity } from "../components/tables";
import { TokenOverView, TokenBids, TokenHistory } from "../components/tokens";
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
      path: "/collection/:id/:slug?",
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
          component: TableActivity,
        },
      ],
    },
    {
      path: "/create/:createSlug?",
      redirect: {
        name: "ChooseBlockchainPage"
      },
      props: true,
      children: [
        {
          path: "start",
          name: "ChooseBlockchainPage",
          component: () =>
            import("../pages/TheBlockchainOptionsAndErcTypesPageView.vue"),
        },
        {
          path: "start/:startSlug",
          name: "ChooseERCTypesPage",
          component: () =>
            import("../pages/TheBlockchainOptionsAndErcTypesPageView.vue"),
          props: (route) => ({
            routeName: route.name,
            startSlug: route.params.startSlug,
          }),
        },
        {
          path: "erc-721",
          name: "CreatePageERC721",
          component: () => import("../pages/TheCreatePageView.vue"),
        },
        {
          path: "erc-1155",
          name: "CreatePageERC1155",
          component: () => import("../pages/TheCreatePageView.vue"),
        },
      ],
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
