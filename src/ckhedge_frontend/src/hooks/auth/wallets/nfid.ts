import { HttpAgent, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import fetch from "cross-fetch";
import { WalletType } from "./wallet";

const APPLICATION_NAME = "ckHEDGE";
const APPLICATION_LOGO_URL =
  "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg";
const AUTH_PATH =
  "/authenticate/?applicationName=" +
  APPLICATION_NAME +
  "&applicationLogo=" +
  APPLICATION_LOGO_URL +
  "#authorize";
const NFID_AUTH_URL = "https://nfid.one" + AUTH_PATH;

export const nfidLogin = async (authClient: AuthClient) => {
  await new Promise((resolve, reject) => {
    authClient.login({
      identityProvider: NFID_AUTH_URL,
      windowOpenerFeatures:
        `left=${window.screen.width / 2 - 525 / 2}, ` +
        `top=${window.screen.height / 2 - 705 / 2},` +
        `toolbar=0,location=0,menubar=0,width=525,height=705`,
      onSuccess: () => {
        resolve(true);
      },
      onError: (err) => {
        console.log("error", err);
        reject();
      },
    });
  });

  return authClient.getIdentity();
};

export const getAuthClient = async () =>
  await AuthClient.create({
    idleOptions: { idleTimeout: 1000 * 60 * 60 * 24 },
  });

export const getAgent = async (identity?: Identity) =>
  await HttpAgent.create({
    host: "https://ic0.app/",
    fetch,
    identity,
  });


  const connectNFIDWallet = async (callback) => {
    const authClient = await getAuthClient();

	const onConnectCallback = async() => {
	
        if (authClient.isAuthenticated()) {
            callback(
                true,
                WalletType.NFID
            );
        }
        callback(false, null);
	}

    await new Promise((resolve, reject) => {
        authClient.login({
          identityProvider: NFID_AUTH_URL,
          windowOpenerFeatures:
            `left=${window.screen.width / 2 - 525 / 2}, ` +
            `top=${window.screen.height / 2 - 705 / 2},` +
            `toolbar=0,location=0,menubar=0,width=525,height=705`,
          onSuccess: () => {
            onConnectCallback();
          },
          onError: (err) => {
            console.log("error", err);
            reject();
          },
        });
      });

}

export { connectNFIDWallet };
