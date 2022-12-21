import { ref, watchEffect } from "vue";
import router from "../router";

export default {
  install: (app: any, _options: any) => {
    const { ethereum } = window;
    const currentAccount = ref<string>("");

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
    const changeThemeSkin = (theme: { id: string }) => {
      localStorage.theme = theme.id;
      isActiveThemeSkin.value = theme.id;
      activateThemeSkin();
    };
    /**Ends: Change App Theme background and colors */

    const blockchainNetwork = ref<string>("ethereum");
    const selectBlockchain = (blockchainId: string) => {
      blockchainNetwork.value = blockchainId;
    };

    const connectWallet = async (wallet: string) => {
      try {
        if (!ethereum && wallet == "MetaMask")
          return alert("Please install MetaMask");
        console.log("ethereum1:", ethereum);

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        currentAccount.value = account[0];
        console.log("ethereum2:", ethereum);
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
            },
          ])
        );
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object");
      }
    };

    const disconnectWallet = async () => {
      try {
        currentAccount.value = "";
        localStorage.removeItem("marketPlace:ISCONNECTED");
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object");
      }
    }

    watchEffect(() => {
      if (!localStorage.theme) {
        localStorage.theme = "lightTheme";
      }
      isActiveThemeSkin.value = localStorage.theme;
      activateThemeSkin();
    });

    app.provide("provider", {
      changeThemeSkin,
      isActiveThemeSkin,
      selectBlockchain,
      blockchainNetwork,
      currentAccount,
      connectWallet,
      disconnectWallet
    });
  },
};
