import { AccountIdentifier } from '@dfinity/ledger-icp';
import { Principal } from '@dfinity/principal';
import { StoicIdentity } from "../../auth/wallets/ic-stoic-identity-custom";
import { WalletType } from '../wallets/wallet';
import { AuthClient } from '@dfinity/auth-client';
import { getAuthClient } from '../wallets/nfid';
import { isPlugWalletConnected } from '../wallets/plug-wallet';

export const getPrincipalAddress = async (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.InternetIdentity:
        return getInternetIdentityPrincipalAddress();
      case WalletType.NFID:
        return getNFIDPrincipalAddress();
      case WalletType.PlugWallet:
        return getPlugPrincipalAddress();
      case WalletType.InfinityWallet:
        return getInfinityPrincipalAddress();
      case WalletType.StoicWallet:
        return getStoicPrincipalAddress();
    }
  };

  const aidFromPrincipal = (principal: Principal) => {
    const accountIdentifier = AccountIdentifier.fromPrincipal({
      principal: principal,
      subAccount: undefined 
    });
    console.log("Account Identifier: ", accountIdentifier);
    console.log("Account Identifier: ", accountIdentifier.toHex);
    return accountIdentifier.toHex();
  }

  const getInternetIdentityPrincipalAddress = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const principalAddress = identity.getPrincipal().toText();
    const aid = aidFromPrincipal(identity.getPrincipal());
    return { principalAddress, aid };
  };

  const getNFIDPrincipalAddress = async () => {
    const authClient = await getAuthClient();
    const identity = authClient.getIdentity();
    const principalAddress = identity.getPrincipal().toText();
    const aid = aidFromPrincipal(identity.getPrincipal());
    return { principalAddress, aid };
  };

  const getPlugPrincipalAddress = async () => {
    if (!isPlugWalletConnected()) {
      return;
    }
    const principalAddress = window.ic?.plug?.principalId;
    const aid = window.ic?.plug?.accountId;
    return { principalAddress, aid };
  };

  const getInfinityPrincipalAddress = async () => {
    const principalAddress = await window.ic?.infinityWallet?.getPrincipal()
    const aid = aidFromPrincipal(principalAddress);
    const stringAddress = principalAddress.toText();
    return { principalAddress: stringAddress, aid };
  };

  const getStoicPrincipalAddress = async () => {
    const identity = await StoicIdentity.connect();
    const principalAddress = identity.getPrincipal().toText();
    const aid = aidFromPrincipal(identity.getPrincipal());
    return { principalAddress, aid };
  };
