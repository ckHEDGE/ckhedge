import React, {
  useContext,
  useState,
  createContext,
  FC,
} from "react";
import {
  Actor,
  ActorSubclass,
  HttpAgent,
  Identity,
} from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId as identityCanId } from "../declarations/internet_identity/index";
import { canisterId, idlFactory } from "../declarations/ckhedge_backend";

const localhost = "http://localhost:3000";
const host = "https://icp0.io";
const network = process.env.DFX_NETWORK || "local";

interface LayoutProps {
  children: React.ReactNode;
}

const authClient = await AuthClient.create({
  idleOptions: {
    idleTimeout: 1000 * 60 * 30, // set to 30 minutes
    disableDefaultIdleCallback: true, // disable the default reload behavior
  },
});

type Context = {
  identity: any;
  backendActor: any;
  isAuthenticated: boolean;
  login(): void;
  logout(): void;
  checkAuth(): void;
};

const initialContext: Context = {
  identity: null,
  backendActor: null,
  isAuthenticated: false,
  login: (): void => {
    throw new Error("login function must be overridden");
  },
  logout: (): void => {
    throw new Error("logout function must be overridden");
  },
  checkAuth: (): void => {
    throw new Error("checkAuth function must be overridden");
  },
};

const ContextWrapper = createContext<Context>(initialContext);

export const useAuth = () => {
  return useContext(ContextWrapper);
};

export const ContextProvider: FC<LayoutProps> = ({ children }) => {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [backendActor, setBackendActor] = useState<ActorSubclass | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);
    await authClient.login({
      identityProvider:
        network === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=${identityCanId}`,
      maxTimeToLive: days * hours * nanoseconds,
      onSuccess: () => {
        setIsAuthenticated(true);
        checkAuth();
      },
      onError: (err) => alert(err),
    });
  };

  const checkAuth = async () => {
    if (await authClient.isAuthenticated()) {
      setIsAuthenticated(true);
      const _identity = authClient.getIdentity();
      console.log("identity", _identity);
      setIdentity(_identity);

      let agent = new HttpAgent({
        host: network === "local" ? localhost : host,
        identity: _identity,
      });
      agent.fetchRootKey();

      const _backendActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: canisterId,
      });
      setBackendActor(_backendActor);
    }
  };

  const logout = async () => {
    await authClient.logout();
    setIsAuthenticated(false);
  };


  return (
    <ContextWrapper.Provider
      value={{
        identity,
        backendActor,
        isAuthenticated,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};
