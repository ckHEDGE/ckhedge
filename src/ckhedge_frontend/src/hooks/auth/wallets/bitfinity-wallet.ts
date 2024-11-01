import { isMobile } from '@walletconnect/browser-utils';
import { WalletType } from './wallet';
import { canisterId } from '../../../../../declarations/ckhedge_backend';

const connectBitfinityWallet = async (callback) => {
	const whitelist = [canisterId]
	const timeout = 120000
	const host = "http://127.0.0.1:4943/"

	const onConnectCallback = async (connected) => {
		if(window.ic.infinityWallet.isConnected()) {
			callback(
				true, 
				WalletType.InfinityWallet
			);
		}
		callback(false, null);
	}

	if (!window.ic?.infinityWallet) {
		if (!isMobile()) {
		  window.open('https://wallet.bitfinity.network/', '_blank');
		  return;
		}
	}

	window.ic?.infinityWallet?.requestConnect({
		whitelist,
		host,
		timeout,
	})
	.then((connected) => {
		console.info("Success : " + connected);
		onConnectCallback(connected);
	})
	.catch(error => {
		console.error("Error : " + error);
	})

}

const isInfinityWalletConnected = () => {
	return window.ic?.infinity?.isConnected()
}

export { connectBitfinityWallet, isInfinityWalletConnected };