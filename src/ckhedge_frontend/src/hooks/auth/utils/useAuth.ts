import { useState, useEffect } from "react";
import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";

import { User, useUser } from "./useUser";
import { useSessionData } from "./useSessionData";
import { StoicIdentity } from "../../auth/wallets/ic-stoic-identity-custom";
import { _SERVICE } from "../../../../../declarations/ckhedge_backend/ckhedge_backend.did";
import { WalletType } from "../wallets/wallet";
import { canisterId, idlFactory  } from "../../../../../declarations/ckhedge_backend";
import { AuthClient } from "@dfinity/auth-client";
import { getAuthClient } from "../wallets/nfid";
import { host } from "../../constants";
import { isPlugWalletConnected } from "../wallets/plug-wallet";
import { isInfinityWalletConnected } from "../wallets/bitfinity-wallet";
import { getPrincipalAddress } from "./util";


export const useAuth = () => {
  const { addUser, removeUser, syncUser, user } = useUser();
  const { sessionData, updateSessionData, deleteSessionData, syncSessionData } =
    useSessionData();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userICPBalance, setUserICPBalance] = useState<bigint>(BigInt(0));
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [aid, setAid] = useState<string | null>(null);


  const [backendActor, setBackendActor] =
    useState<ActorSubclass<_SERVICE> | null>(null);

  useEffect(() => {
    try {
      if (sessionData && sessionData.connected == true) {
        setIsAuthenticated(true);
        updateClient(sessionData.connectedWalletType);
      }
    } catch (error) {
      console.log("Error in sessionData useEffect: ", error);
    }
  }, [sessionData]);
  enum WalletType {
    InternetIdentity,
    NFID,
    PlugWallet,
    InfinityWallet,
    StoicWallet
  }
  

  useEffect(() => {
    const session = localStorage.getItem("session-data");
    if (session) {
      const sessionData = JSON.parse(session);
     switch (sessionData.connectedWalletType) {
        case 0:
          updateInternetIdentityClient();
          break;
        case 1:
          updateNFIDClient();
          break;
        case 2:
          updatePlugClient();
          break;
        case 3:
          updatebitfinityClient();
          break;
        case 4:
          updateStoicClient();
          break;
     }
    }
  }, []);


  const login = async (walletType: WalletType) => {
    const {principalAddress, aid} = await getPrincipalAddress(walletType);
    updateSessionData({ connected: true, connectedWalletType: walletType, principalId: principalAddress, aid: aid });
  };




  const logout = () => {
    const session = localStorage.getItem("session-data");
    if (session) {
      const sessionData = JSON.parse(session);
      switch (sessionData.connectedWalletType) {
        case 0:
          logoutInternetIdentity();
          break;
        case 1:
          logoutNFID();
          break;
        case 2:
          logoutPlugWallet();
          break;
        case 3:
          logoutInfinityWallet();
          break;
        case 4:
          logoutStoicWallet();
          break;
      }
    }
    removeUser();
    deleteSessionData();
    setIsAuthenticated(false);
    setPrincipalId(null);
  };


  const logoutInternetIdentity = async () => {
    const authClient = await AuthClient.create();
    authClient.logout();
  }

  const logoutNFID = async () => {
    const authClient = await getAuthClient();
    authClient.logout();
  }

  const logoutPlugWallet = async () => {
    window.ic?.plug?.disconnect();
  }

  const logoutInfinityWallet = async () => {
    window.ic?.infinityWallet?.disconnect();
  }

  const logoutStoicWallet = async () => {
    StoicIdentity.disconnect();
  }


  const autoLogin = () => {
    syncSessionData();
    syncUser();
  };

  const updateClient = async (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.InternetIdentity:
        await updateInternetIdentityClient();
        break;
      case WalletType.NFID:
        await updateNFIDClient();
        break;
      case WalletType.PlugWallet:
        await updatePlugClient();
        break;
      case WalletType.InfinityWallet:
        await updatebitfinityClient();
        break;
      case WalletType.StoicWallet:
        await updateStoicClient();
        break;
    }
  };

  const updateInternetIdentityClient = async () => {
    try {
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
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
        setBackendActor(_backendActor);
      }
    } catch (error) {
      console.log("Error in updateInternetIdentityClient: ", error);
    }
  }

  const updateNFIDClient = async () => {
    try {
      const authClient = await getAuthClient();
      const isAuthenticated = await authClient.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
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
        setBackendActor(_backendActor);
      }
    } catch (error) {
      console.log("Error in updateNFIDClient: ", error);
    }
  }

  const updatePlugClient = async () => {
    if (!isPlugWalletConnected()) {
      return;
    }
    try {
      setPrincipalId(window.ic?.plug?.principalId);
      const _backendActor = await window.ic?.plug?.createActor({
        canisterId: canisterId,
        interfaceFactory: idlFactory,
      });
      setIsAuthenticated(true);
      setBackendActor(_backendActor);
    } catch (error) {
      console.log("Error in updatePlugClient: ", error);
    }
  };

  const updatebitfinityClient = async () => {
    const _backendActor = await window.ic?.infinityWallet?.createActor({
      canisterId: canisterId,
      interfaceFactory: idlFactory,
    }); 
    const principalId = await window.ic.infinityWallet.getPrincipal();
    const aid = window.ic?.infinityWallet?.accountId;
    setAid(aid);
    setPrincipalId(principalId.toText());
    setBackendActor(_backendActor);
  };

  const updateStoicClient = async () => {
    try {
      if (typeof window !== "undefined") {
        StoicIdentity.load().then(async (identity: any) => {
          if (identity !== false) {
            initStoicActor(identity);
          } else {
            identity = await StoicIdentity.connect();
            initStoicActor(identity);
          }
        });
      }
    } catch (error) {
      console.log("Error in connectStoicWallet:", error);
    }
  };

  const initStoicActor = async (identity: any) => {
    setPrincipalId(identity.getPrincipal().toText());
    const _backendActor =
      Actor.createActor<ActorSubclass<_SERVICE> | null>(
        idlFactory,
        {
          agent: await HttpAgent.create({
            identity,
            host: host,
          }),
          canisterId: canisterId,
        }
      );

    setBackendActor(_backendActor);
  }

  return {
    login,
    logout,
    autoLogin,
    principalId,
    sessionData,
    user,
    aid,
    isAuthenticated,
    userICPBalance,
    backendActor
  };
};
