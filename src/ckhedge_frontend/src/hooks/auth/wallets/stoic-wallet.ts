import { StoicIdentity } from "./ic-stoic-identity-custom";
import { WalletType } from "./wallet";

const connectStoicWallet = async (callback) => {
	const host = "http://127.0.0.1:4943"

	try {
		let identity = await StoicIdentity.load()

		if (identity !== false) {
			//ID is a already connected wallet!
		} else {
			//No existing connection, lets make one!
			try {
			identity = await StoicIdentity.connect();
			} catch (error) {
			console.log("Error : " + error);
			return;
			}
		}

		const onConnectCallback = async (identity) => {
			if(identity !== false) {
				callback(
					true, 
					WalletType.StoicWallet
				);
			}
			callback(false, null);
		}

		try {
			await onConnectCallback(identity)
		} catch(error) {
			console.error("Error : " + error);
		}
	} catch (error) {
		console.log("Error : " + error);
	}
}

export { connectStoicWallet };