import { createRouter, createWebHistory } from "vue-router";
import { TheHomePageView } from "../pages";
import { TableFiltersAssets, TableActivity } from "../components/tables";
import { TokenOverView, TokenBids, TokenHistory } from "../components/tokens";
import ConnectWallet from "@/components/ConnectWallet.vue";
import StatusMessages from "@/components/StatusMessages.vue";
import {
  SettingsProfileAccount,
  SettingsProfileNotifications,
  SettingsProfileWallets,
} from "@/components/settings-profile";
import { ItemsOwnedCollections } from "@/components/items-owned-profile";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: TheHomePageView,
      props: (route) => ({
        name: route.name
      }),
      meta: {
        title: "NFT Marketplace",
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
      path: "/explore/:activeBlockchainId/:slug?",
      component: () => import("../pages/TheExploreBlockchainPageView.vue"),
      props: (route) => ({
        // name: route.meta.name,
        activeBlockchainId: route.params.activeBlockchainId,
        slug: route.params.slug,
      }),
      meta: {
        requiresWalletAuth: false,
        name: "ExploreBlockchainNFTS",
      },
      children: [
        {
          path: "", //collections
          name: "TableCollections",
          component: TableCollections,
        },
        {
          path: "items",
          name: "TableCollectionNFTs",
          component: TableFiltersAssets,
        },
        {
          path: "users",
          name: "TableCollectionUsers",
          component: TableFiltersAssets,
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
      path: "/settings/:settingSlug?",
      // name: "SettingsPage",
      // route level code-splitting
      // this generates a separate chunk (TheSettingsPageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheSettingsProfilePageView.vue"),
      meta: { title: "Edit Profile", requiresWalletAuth: true },
      children: [
        {
          path: "",
          name: "SettingsProfileAccount",
          component: SettingsProfileAccount,
        },
        {
          path: "wallets",
          name: "SettingsProfileWallets",
          component: SettingsProfileWallets,
        },
        {
          path: "notifications",
          name: "SettingsProfileNotifications",
          component: SettingsProfileNotifications,
        },
      ],
    },
    {
      path: "/items/:itemsSlug?",
      // name: "itemsOwnedPage",
      // route level code-splitting
      // this generates a separate chunk (TheCollectionPageView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/TheItemsOwnedPageView.vue"),
      meta: {
        title: "Profile | InterestQQ",
        requiresWalletAuth: true,
        name: "itemsOwnedPage",
      },
      children: [
        {
          path: "",
          name: "ItemsOwned",
          component: TableFiltersAssets,
        },
        {
          path: "sale",
          name: "ItemsOwnedOnSale",
          component: TableFiltersAssets,
        },
        {
          path: "activity",
          name: "ItemsOwnedActivity",
          component: TableActivity,
        },
        {
          path: "collections",
          name: "ItemsOwnedCollections",
          component: ItemsOwnedCollections,
        },
        {
          path: "created",
          name: "ItemsOwnedCreated",
          component: TableFiltersAssets,
        },
        {
          path: "sold",
          name: "ItemsOwnedSold",
          component: TableFiltersAssets,
        },
        {
          path: "liked",
          name: "ItemsOwnedLiked",
          component: TableFiltersAssets,
        },
        {
          path: "hidden",
          name: "ItemsOwnedHidden",
          component: TableFiltersAssets,
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
  // const cartBagInfo = JSON.parse(
  //   localStorage.getItem("marketPlace:CART_USER_INFO") || "{}"
  // );
  // console.log("cartBagInfo", cartBagInfo);
  
  if (to.meta.requiresWalletAuth && wallet.length == 0) {
    return {
      name: "StatusMessagePage",
      query: {
        redirect: to.fullPath,
      },
    };
  }
});
router.afterEach((to) => {
  document.title = (to.meta.title as string) || "NFT Marketplace";
})

export default router;
