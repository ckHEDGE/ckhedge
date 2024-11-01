import { AuthClient } from "@dfinity/auth-client";
import { WalletType } from "./wallet";
import { network } from "../../constants";
import { canisterId } from "../../../../../declarations/internet_identity";

const loginOptions = {
  identityProvider:
    network === "ic"
      ? "https://identity.ic0.app/#authorize"
      : `http://${canisterId}.localhost:4943`,
};

const connectInternetIdentityWallet = async (callback) => {
  const authClient = await AuthClient.create();

  const onConnectCallback = async () => {
    if (authClient.isAuthenticated()) {
      callback(true, WalletType.InternetIdentity);
    }
    callback(false, null);
  };

  authClient.login({
    ...loginOptions,
    onSuccess: () => {
      onConnectCallback();
    },
  });
};

export { connectInternetIdentityWallet };
