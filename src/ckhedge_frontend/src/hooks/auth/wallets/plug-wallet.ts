import { isMobile } from "@walletconnect/browser-utils";
import { WalletType } from "./wallet";
import { canisterId } from "../../../../../declarations/ckhedge_backend";
import { network } from "../../constants";

const connectPlugWallet = async (callback) => {
  const whitelist = [canisterId];
  const timeout = 120000;
  const host = "https://icp0.io";
  const localhost = "http://localhost:4943/";

  const onConnectCallback = (connected) => {
    if (window.ic.plug.isConnected()) {
      callback(true, WalletType.PlugWallet);
    }
    callback(false, null);
  };

  if (!window.ic?.plug) {
    if (!isMobile()) {
      window.open("https://plugwallet.ooo/", "_blank");
      return;
    }
  }

  window.ic?.plug
    ?.requestConnect({
      whitelist,
      host: network === "local" ? localhost : host,
      timeout,
    })
    .then((connected) => {
      console.info("Success : " + connected);
      onConnectCallback(connected);
    })
    .catch((error) => {
      console.error("Error : " + error);
    });
};

const getPlugWalletData = () => {
  if (window.ic?.plug?.isConnected()) {
    return window.ic?.plug?.sessionManager;
  }
};

const isPlugWalletConnected = () => {
  return window.ic?.plug?.isConnected();
};

const getPlugWalletBalance = async () => {
  return await window.ic.plug.requestBalance();
};

export {
  connectPlugWallet,
  getPlugWalletData,
  isPlugWalletConnected,
  getPlugWalletBalance,
};
