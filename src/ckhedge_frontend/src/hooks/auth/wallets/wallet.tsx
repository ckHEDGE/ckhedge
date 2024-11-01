import { AuthClient } from "@dfinity/auth-client"
import { isInfinityWalletConnected } from "./bitfinity-wallet"
import { StoicIdentity } from "./ic-stoic-identity-custom"
import { getPlugWalletBalance, getPlugWalletData, isPlugWalletConnected } from "./plug-wallet"
import { getAuthClient } from "./nfid"


export enum WalletType {
	InternetIdentity,
	NFID,
	PlugWallet,
	InfinityWallet,
	StoicWallet
}

const getWalletData = (walletType: WalletType) => {
	switch (walletType) {
		case WalletType.PlugWallet: return getPlugWalletData()
	}
}

const isWalletConnected = async (walletType: WalletType) => {
	switch (walletType) {
		case WalletType.InternetIdentity: {
			const authClient = await AuthClient.create()
			return authClient.isAuthenticated()

		}
		case WalletType.NFID: {
			const authClient = await getAuthClient();
			return await authClient.isAuthenticated();
		}
		case WalletType.PlugWallet: return isPlugWalletConnected()
		case WalletType.InfinityWallet: return isInfinityWalletConnected()
		case WalletType.StoicWallet: return await StoicIdentity.load()
	}
}

const getWalletBalance = async (walletType: WalletType) => {
	switch (walletType) {
		case WalletType.PlugWallet: return (await getPlugWalletBalance())
	}
}

export { getWalletData, isWalletConnected, getWalletBalance }