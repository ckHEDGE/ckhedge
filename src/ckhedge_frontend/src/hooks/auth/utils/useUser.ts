import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { WalletType } from "../../auth/wallets/wallet";

export interface User {
	username: string;
	bio: string;
	walletType: WalletType;
	pid: string,
	aid: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getItem, setItem, removeItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  const syncUser = () => {
	var userdata = getItem("user");
	if(userdata) setUser(JSON.parse(userdata));
  } 

  return { user, addUser, removeUser, syncUser };
};