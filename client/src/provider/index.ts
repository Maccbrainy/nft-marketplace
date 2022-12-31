import { ref, watchEffect, computed } from "vue";
import router from "../router";
interface WalletSchema {
  name: string,
  is_connected: boolean,
  is_metamask: boolean,
  selected_address: string,
  current_account: string,
  networkVersion: string,
  networkName: string

}
export default {
  install: (app: any, _options: any) => {
    const { ethereum } = window;
    const currentAccount = ref<string>("");
    const wallet = ref<WalletSchema[]>([]);

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
          redirect: routeRedirect
        }
      });
      console.log("routeRedirect:", routeRedirect);
    }

    const blockchainNetwork = ref<string>("ethereum");
    const selectBlockchain = (blockchainId: string) => {
      blockchainNetwork.value = blockchainId;
    };

    const connectWallet = async (
      walletModel: string,
      routeRedirect: string
    ) => {
      // const redirectedPath = routeRedirect || router.back()
      try {
        if (!ethereum && walletModel == "MetaMask")
          return alert("Please install MetaMask");
        if (walletModel == "WalletConnect") 
          return alert("WalletConnect coming soon!")
        if (walletModel == "Install Phantom")
          return alert("Phantom coming soon!");

        if (
          blockchainNetwork.value == "ethereum" &&
          walletModel == "MetaMask"
        ) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          currentAccount.value = account[0];
          localStorage.setItem(
            "marketPlace:ISCONNECTED",
            JSON.stringify([
              {
                name: ethereum.networkVersion,
                is_connected: true,
                is_metamask: ethereum.isMetaMask,
                selected_address: ethereum.selectedAddress,
                current_account: currentAccount.value,
                networkVersion: ethereum.networkVersion,
                networkName: blockchainNetwork.value
              },
            ])
          );
        }
        wallet.value = JSON.parse(
          localStorage.getItem("marketPlace:ISCONNECTED") || "[]"
        );
        if (routeRedirect) {
          router.push({
            path: routeRedirect
          })
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
        localStorage.removeItem("marketPlace:ISCONNECTED");
        router.push({
          name: router.currentRoute.value.name || undefined 
        })
      } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object");
      }
    }
    const teleportModalOpenMenuBar = ref<boolean>(false);
    const teleportModalCallback = (modal: {
      name: string;
      open_modal: boolean;
    }) => {
      if (modal.name == "isMenuBar") {
        teleportModalOpenMenuBar.value = modal.open_modal;
        console.log("Teleport:", modal.name, teleportModalOpenMenuBar.value);
      }
    }


    const showMarketplaceCartBag = ref(false);
    const showMarketplaceCartBagCallback = () => {
      showMarketplaceCartBag.value = !showMarketplaceCartBag.value
    }

    const matchedRoutesComposable = computed<boolean>(
      () =>
        router.currentRoute.value.matched[0].path == "/collection/:id/:slug?" ||
        router.currentRoute.value.name == "HomePage"
    );


    watchEffect(() => {
      if (!localStorage.theme) {
        localStorage.theme = "lightTheme";
      }
      isActiveThemeSkin.value = localStorage.theme;
      activateThemeSkin();
    });

    app.provide("provider", {
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
      teleportModalOpenMenuBar,
      showMarketplaceCartBagCallback,
      showMarketplaceCartBag,
      matchedRoutesComposable
    });
  },
};
