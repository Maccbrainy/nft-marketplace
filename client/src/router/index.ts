import { createRouter, createWebHistory } from "vue-router";
import { TheHomePageView } from "../pages";
import { TableFiltersAssets, TableActivity } from "../components/tables";
import { TokenOverView, TokenBids, TokenHistory } from "../components/tokens";
import ConnectWallet from "@/components/ConnectWallet.vue";
import StatusMessages from "@/components/StatusMessages.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: TheHomePageView,
      meta: {
        title: "Cryptop NFT Market Place",
        requiresWalletAuth: false,
      },
    },
    {
      path: "/status",
      name: "StatusMessagePage",
      component: StatusMessages,
      meta: {
        title: "Choose blockchain",
        requiresWalletAuth: false,
      },
    },
    {
      path: "/connect",
      name: "ConnectWalletPage",
      component: ConnectWallet,
      meta: {
        title: "Choose Wallet",
        requiresWalletAuth: false,
      },
    },
    {
      path: "/collection/:id/:slug?",
      // name: "CollectionPage",
      // route level code-splitting
      // this generates a separate chunk (TheCollectionPageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheCollectionPageView.vue"),
      meta: { requiresWalletAuth: false },
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
        name: "ChooseBlockchainPage",
      },
      props: true,
      children: [
        {
          path: "start",
          name: "ChooseBlockchainPage",
          component: () =>
            import("../pages/TheBlockchainOptionsAndErcTypesPageView.vue"),
          meta: { requiresWalletAuth: false },
        },
        {
          path: "start/:startSlug",
          name: "ChooseERCTypesPage",
          component: () =>
            import("../pages/TheBlockchainOptionsAndErcTypesPageView.vue"),
          meta: { requiresWalletAuth: true },
          props: (route) => ({
            routeName: route.name,
            startSlug: route.params.startSlug,
          }),
        },
        {
          path: "erc-721",
          name: "CreatePageERC721",
          component: () => import("../pages/TheCreatePageView.vue"),
          meta: { requiresWalletAuth: true },
        },
        {
          path: "erc-1155",
          name: "CreatePageERC1155",
          component: () => import("../pages/TheCreatePageView.vue"),
          meta: { requiresWalletAuth: true },
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
      meta: { requiresWalletAuth: false },
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

router.beforeEach((to) => {
  const wallet = JSON.parse(
    localStorage.getItem("marketPlace:ISCONNECTED") || "[]"
  );
  console.log("isWalletConnected", wallet);
  
  if (to.meta.requiresWalletAuth && wallet.length == 0) {
    return {
      name: "StatusMessagePage",
      query: {
        redirect: to.fullPath,
      },
    };
  }
});

export default router;
