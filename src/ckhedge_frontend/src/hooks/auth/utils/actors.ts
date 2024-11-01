import { HttpAgent, Actor, ActorSubclass } from "@dfinity/agent";
import { StoicIdentity } from "../../auth/wallets/ic-stoic-identity-custom";
import { WalletType } from "../../auth/wallets/wallet";
import { canisterId, idlFactory } from "../../../../../declarations/ckhedge_backend";
import { host, network } from "../../constants";
import { getAuthClient } from "../wallets/nfid";
import { _SERVICE } from "../../../../../declarations/ckhedge_backend/ckhedge_backend.did";
import { AuthClient } from "@dfinity/auth-client";


// CHANGE ME IN PRODUCTION;

const getActor = async (canisterId: string, walletType: WalletType) => {
    switch (walletType) {
        case WalletType.InternetIdentity:
          return await updateInternetIdentityClient();
        case WalletType.NFID:
          return await updateNFIDClient();
        case WalletType.PlugWallet:
         return await updatePlugClient(canisterId);
        case WalletType.InfinityWallet:
          return await updatebitfinityClient(canisterId);
        case WalletType.StoicWallet:
         return await updateStoicClient(canisterId);
      }
};

const updateInternetIdentityClient = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const agent = await HttpAgent.create({
        identity,
        host: host,
      });
      const _backendActor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId: canisterId,
      });
    return _backendActor;
    } catch (error) {
      console.log("Error in updateInternetIdentityClient: ", error);
    }
  }

  const updateNFIDClient = async () => {
    try {
      const authClient = await getAuthClient();
      const isAuthenticated = await authClient.isAuthenticated();
      if (isAuthenticated) {
        const identity = authClient.getIdentity();
        const agent = await HttpAgent.create({
          identity,
          host: host,
        });
        const _backendActor = Actor.createActor<_SERVICE>(idlFactory, {
          agent,
          canisterId: canisterId,
        });
      return _backendActor;
      }
    } catch (error) {
      console.log("Error in updateNFIDClient: ", error);
    }
  }

const updatePlugClient = async (canisterId : string) => {
    try {
      const _backendActor = await window.ic?.plug?.createActor({
       canisterId,
        interfaceFactory: idlFactory,
      });
      return _backendActor;
    } catch (error) {
      console.log("Error in updatePlugClient: ", error);
    }
  };

  const updatebitfinityClient = async (canisterId : string) => {
    const _backendActor = await window.ic?.infinityWallet?.createActor({
      canisterId,
      interfaceFactory: idlFactory,
    }); 
   return _backendActor;
  };

  const updateStoicClient = async (canisterId : string) => {
    try {
      if (typeof window !== "undefined") {
        StoicIdentity.load().then(async (identity: any) => {
          if (identity !== false) {
          return await  initStoicActor(identity, canisterId);
          } else {
            identity = await StoicIdentity.connect();
           return await initStoicActor(identity, canisterId);
          }
        });
      }
    } catch (error) {
      console.log("Error in connectStoicWallet:", error);
    }
  };

  const initStoicActor  =  async (identity: any, canisterId: string) => {
    const HOST = network === "ic" ? `https://${canisterId}.icp0.io/` : "http://127.0.0.1:3000/";
    const _backendActor =
      Actor.createActor(
        idlFactory,
        {
          agent: await HttpAgent.create({
            identity,
            host: HOST,
          }),
          canisterId
        }
      );

    return _backendActor;
  }
export { getActor };