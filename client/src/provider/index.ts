import { ref, watchEffect, computed } from "vue";
import router from "../router";
import { useMediaQuery } from "@vueuse/core";
import type {
  MarketplaceCartBagItemType,
  AppToastInformationBus,
} from "@/types";

interface WalletType {
  name: string;
  is_connected: boolean;
  dapp: string;
  selected_address: string;
  current_account: string;
  networkVersion: string;
  blockchain: string;
}

interface MarketplaceCartBagInfo {
  [x: string]: {
    ITEMS: Array<MarketplaceCartBagItemType>;
  };
}
export default {
  install: (app: any, _options: any) => {
    const { ethereum } = window;
    const appToastInformationBus = ref<AppToastInformationBus>({
      title: "",
      description: "",
      icon: undefined,
      isCoverImage: false,
      isAvatarImage: false,
      isVerifyUser: false,
      saveUserProfileSettings: false,
      closeButtonTitle: "",
      isProcessing: false,
      wallet: "",
      blockchain: "",
      coverImageUrl: "",
      avatarImageUrl: "",
    });
    const activateModalSidebar = ref<{ name: string; active: boolean }>({
      name: "",
      active: false,
    });
    const openingMarketplaceCartBagIndex = ref<number>(1);

    const isLargeScreen = useMediaQuery("(min-width: 991px)");

    const wallet = ref<WalletType[]>(
      JSON.parse(localStorage.getItem("marketPlace:ISCONNECTED") || "[]")
    );

    const currentAccount = ref<string>(
      wallet.value.length > 0 ? wallet.value[0].current_account : ""
    );

    const showMarketplaceCartBag = ref(false);
    const marketplaceCartBagInfo = ref<MarketplaceCartBagInfo>(
      JSON.parse(localStorage.getItem("marketPlace:CART_USER_INFO") || "{}")
    );

    const extractCartBagInfoDynamicKey = computed<string[]>(() =>
      Object.keys(marketplaceCartBagInfo.value).length > 0
        ? Object.keys(marketplaceCartBagInfo.value)
        : []
    );
    const marketplaceCartBagItems = ref<MarketplaceCartBagItemType[]>(
      extractCartBagInfoDynamicKey.value.length > 0
        ? marketplaceCartBagInfo.value[extractCartBagInfoDynamicKey.value[0]]
            .ITEMS
        : []
    );

    /**Begins: Change App Theme background and colors */
    const isActiveThemeSkin = ref<string>(localStorage.theme);
    const activateThemeSkin = () => {
      const rootDocumentClass = document.documentElement.classList;
      if (isActiveThemeSkin.value === "darkTheme") {
        rootDocumentClass.add("dark");
        rootDocumentClass.remove("light");
      } else {
        rootDocumentClass.remove("dark");
        rootDocumentClass.add("light");
      }
    };
    const changeThemeSkinCallback = (theme: { id: string }) => {
      localStorage.theme = theme.id;
      isActiveThemeSkin.value = theme.id;
      activateThemeSkin();
    };
    /**Ends: Change App Theme background and colors */

    const chooseHowToConnectWallet = (routeRedirect: string) => {
      router.push({
        name: "ConnectWalletPage",
        query: {
          redirect: routeRedirect,
        },
      });
      console.log("routeRedirect:", routeRedirect);
    };

    const blockchainNetwork = ref<string>("ethereum");
    const selectBlockchain = (blockchainId: string) => {
      blockchainNetwork.value = blockchainId;
    };

    const connectWallet = async (dappWallet: string, routeRedirect: string) => {
      // const redirectedPath = routeRedirect || router.back()
      try {
        if (!ethereum && dappWallet == "MetaMask")
          return alert("Please install MetaMask");
        if (dappWallet == "WalletConnect")
          return alert("WalletConnect coming soon!");
        if (dappWallet == "Install Phantom")
          return alert("Phantom coming soon!");

        if (
          blockchainNetwork.value === "ethereum" &&
          dappWallet === "MetaMask"
        ) {
          //show processing status
          appToastInformationBus.value = {
            isProcessing: true,
            wallet: dappWallet,
            blockchain: "ethereum",
          };
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const dappModel = ethereum.isMetaMask ? "MetaMask" : "";
          currentAccount.value = account[0];
          localStorage.setItem(
            "marketPlace:ISCONNECTED",
            JSON.stringify([
              {
                name: ethereum.networkVersion,
                is_connected: true,
                dapp: dappModel,
                selected_address: ethereum.selectedAddress,
                current_account: currentAccount.value,
                networkVersion: ethereum.networkVersion,
                blockchain: blockchainNetwork.value,
              },
            ])
          );
          appToastInformationBus.value = {
            isProcessing: false,
            wallet: "",
            blockchain: "",
          };
        }
        wallet.value = JSON.parse(
          localStorage.getItem("marketPlace:ISCONNECTED") || "[]"
        );
        if (routeRedirect) {
          router.push({
            path: routeRedirect,
          });
        } else {
          router.go(-1);
        }
      } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object");
      }
    };

    const disconnectWallet = async () => {
      try {
        currentAccount.value = "";
        activateModalSidebar.value = {
          name: "isProfileMenuBar",
          active: false,
        };
        // teleportModalOpenProfileMenuBar.value = false;

        localStorage.removeItem("marketPlace:ISCONNECTED");
        router.push({
          name: router.currentRoute.value.name || undefined,
        });
      } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object");
      }
    };

    const teleportModalCallback = (modal: {
      name: string;
      open_modal: boolean;
    }) => {
      const { name, open_modal } = modal;
      activateModalSidebar.value = {
        name: name,
        active: open_modal,
      };
      console.log("activateModalSidebar:", activateModalSidebar.value);
    };

    const removeAllItemsFromMarketplaceCartBag = () => {
      marketplaceCartBagItems.value = [];
      localStorage.removeItem("marketPlace:CART_USER_INFO");
    };

    const getMarketplaceItemIntoCartBag = (itemInfoData: {
      token_address: string;
      token_id: number;
      token_price: number;
      token_name: string;
    }) => {
      const { token_address, token_id } = itemInfoData;
      //index of an item in the marketplace cart collections
      let indexOfItemInCartBagItems: any = null;
      /**
       * Check if the incoming item exist in the marketplace cart collections.
       * if yes, remove the particular item from the cart collections.
       * if No, save item in the cart collections.
       **/
      const isItemInMarketplaceCartBagItems: boolean =
        marketplaceCartBagItems.value.some((item, index) => {
          const isTruthy: boolean =
            item.token_address === token_address && item.token_id === token_id;
          if (isTruthy) {
            indexOfItemInCartBagItems = index;
          }
          return isTruthy;
        });

      if (isItemInMarketplaceCartBagItems) {
        marketplaceCartBagItems.value.splice(indexOfItemInCartBagItems, 1);
      } else {
        marketplaceCartBagItems.value.push(itemInfoData);
      }

      //Check marketplace wallet connection status
      const connectionStatus = currentAccount.value || "anonymous";
      /**
       * Dynamically save all of the marketplace cart items
       * using the connected status as the object property*/
      marketplaceCartBagInfo.value[connectionStatus] = {
        ITEMS: marketplaceCartBagItems.value,
      };
      //Save marketplace cart information to  the local storage
      localStorage.setItem(
        "marketPlace:CART_USER_INFO",
        JSON.stringify(marketplaceCartBagInfo.value)
      );
      if (
        openingMarketplaceCartBagIndex.value == 1 &&
        marketplaceCartBagItems.value.length > 0
      ) {
        showMarketplaceCartBag.value = true;
      }
    };
    const showMarketplaceCartBagCallback = () => {
      if (
        openingMarketplaceCartBagIndex.value === 1 &&
        showMarketplaceCartBag.value &&
        marketplaceCartBagItems.value.length > 0
      ) {
        openingMarketplaceCartBagIndex.value = 0;
      }
      showMarketplaceCartBag.value = !showMarketplaceCartBag.value;
    };
    const matchedRoutesComposable = computed<boolean>(
      () =>
        router.currentRoute.value.matched[0].path == "/collection/:id/:slug?" ||
        router.currentRoute.value.name == "HomePage"
    );
    const teleportModalToastInfoHandler = (
      toastInfo: AppToastInformationBus
    ) => {
      const {
        title,
        description,
        icon,
        isCoverImage,
        isAvatarImage,
        isVerifyUser,
        saveUserProfileSettings,
        closeButtonTitle,
        isProcessing,
        wallet,
        blockchain,
        coverImageUrl,
        avatarImageUrl,
      } = toastInfo;

      appToastInformationBus.value = {
        title: title,
        description: description,
        icon: icon,
        isCoverImage: isCoverImage,
        isAvatarImage: isAvatarImage,
        isVerifyUser: isVerifyUser,
        saveUserProfileSettings: saveUserProfileSettings,
        closeButtonTitle: closeButtonTitle,
        isProcessing: isProcessing,
        wallet: wallet,
        blockchain: blockchain,
        coverImageUrl: coverImageUrl,
        avatarImageUrl: avatarImageUrl,
      };
    };
    watchEffect(() => {
      if (!localStorage.theme) {
        localStorage.theme = "lightTheme";
      }
      isActiveThemeSkin.value = localStorage.theme;
      activateThemeSkin();
    });
    app.provide("provider", {
      appToastInformationBus,
      isLargeScreen,
      changeThemeSkinCallback,
      isActiveThemeSkin,
      selectBlockchain,
      blockchainNetwork,
      currentAccount,
      connectWallet,
      disconnectWallet,
      wallet,
      chooseHowToConnectWallet,
      teleportModalCallback,
      teleportModalToastInfoHandler,
      activateModalSidebar,
      showMarketplaceCartBagCallback,
      getMarketplaceItemIntoCartBag,
      marketplaceCartBagItems,
      showMarketplaceCartBag,
      removeAllItemsFromMarketplaceCartBag,
      matchedRoutesComposable,
    });
  },
};
