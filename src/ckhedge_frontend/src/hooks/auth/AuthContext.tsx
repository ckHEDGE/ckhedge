import React, { useEffect } from "react";
import { ActorSubclass } from "@dfinity/agent";
import { useAuth } from "./utils/useAuth";
import { SessionData } from "./utils/useSessionData";
import { _SERVICE } from "../../../../declarations/ckhedge_backend/ckhedge_backend.did";
import { WalletType } from "./wallets/wallet";


export type AuthContextType = {
  login: (walletType: WalletType) => void;
  logout: () => void;
  autoLogin: () => void;
  sessionData: SessionData | null;
  isAuthenticated: boolean;
  principalId: string | null;
  aid: string | null;
  backendActor: ActorSubclass<_SERVICE> | null;
};

export const AuthContext = React.createContext<AuthContextType | null>(null!);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const auth = useAuth();
  const { children } = props;

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};