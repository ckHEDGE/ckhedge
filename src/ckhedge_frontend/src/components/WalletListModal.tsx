import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ListItemIcon from "@mui/material/ListItemIcon";

import { connectBitfinityWallet } from "../hooks/auth/wallets/bitfinity-wallet";
import { useContext } from "react";
import Typography from "@mui/material/Typography"; // Import Typography
import { Box } from "@mui/material";
import { AuthContext } from "../hooks/auth/AuthContext";
import { WalletType } from "../hooks/auth/wallets/wallet";
import { connectStoicWallet } from "../hooks/auth/wallets/stoic-wallet";
import { connectPlugWallet } from "../hooks/auth/wallets/plug-wallet";
import { connectNFIDWallet } from "../hooks/auth/wallets/nfid";
import { connectInternetIdentityWallet } from "../hooks/auth/wallets/interntidentity";

export interface WalletListModalProps {
  open: boolean;
  onClose: () => void;
}

function WalletListModal(props: WalletListModalProps) {
  const { login } = useContext(AuthContext);
  const { onClose, open } = props;

  const walletConnectCallback = (success: boolean, walletType: WalletType) => {
    if (success) {
      login(walletType);
    }
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          borderRadius: "10px",
          padding: "20px",
          background: "#F4F4F6",
          border: "1px solid #363A5D",

        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          component="div"
          className="text-center font-bold text-xl dark:text-jacarta-100 text-jacarta-700"
          style={{ textTransform: "none" }}
        >
          CONNECT
        </Typography>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              connectInternetIdentityWallet(walletConnectCallback);
            }}
            className="bg-jacarta-200 dark:bg-jacarta-600 hover:bg-jacarta-400 dark:hover:bg-jacarta-400 mx-auto my-0 px-2 rounded-lg"
          >
            <ListItemIcon>
              <Box
                component="img"
                className="h-9 w-9"
                alt="Internet Identity"
                src="/wallets/ic-login.svg"
              />
            </ListItemIcon>
            <ListItemText
              primary="Internet Identity"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "20px",
                className: "text-black",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              connectNFIDWallet(walletConnectCallback);
            }}
            className="bg-jacarta-200 dark:bg-jacarta-600 hover:bg-jacarta-400 dark:hover:bg-jacarta-400 mx-auto my-0 px-2 rounded-lg"
          >
            <ListItemIcon>
              <Box
                component="img"
                className="h-9 w-9"
                alt="NFID"
                src="/wallets/nfid-login.svg"
              />
            </ListItemIcon>
            <ListItemText
              primary="NFID"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "20px",
                className: "text-black",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              connectPlugWallet(walletConnectCallback);
            }}
            className="bg-jacarta-200 dark:bg-jacarta-600 hover:bg-jacarta-400 dark:hover:bg-jacarta-400 mx-auto my-0 px-2 rounded-sm"
          >
            <ListItemIcon>
              <img
                className="h-9 w-9"
                alt="Plug"
                src="/wallets/plug-login.svg"
              />
            </ListItemIcon>
            <ListItemText
              primary="Plug"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "20px",
                className: "text-jacarta-600 dark:text-jacarta-100",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              connectBitfinityWallet(walletConnectCallback);
            }}
            className="bg-jacarta-200 dark:bg-jacarta-600 hover:bg-jacarta-400 dark:hover:bg-jacarta-400 mx-auto my-0 px-2 rounded-lg"
          >
            <ListItemIcon>
              <Box
                component="img"
                className="h-9 w-9"
                alt="Bitfinity"
                src="/wallets/bitfinity-login.svg"
              />
            </ListItemIcon>
            <ListItemText
              primary="Bitfinity"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "20px",
                className: "text-black",

              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              connectStoicWallet(walletConnectCallback);
            }}
            className="bg-jacarta-200 dark:bg-jacarta-600 hover:bg-jacarta-400 dark:hover:bg-jacarta-400 mx-auto my-0 px-2 rounded-lg"
          >
            <ListItemIcon>
              <Box
                component="img"
                className="h-9 w-9"
                alt="Stoic"
                src="/wallets/stoic-login.png"
              />
            </ListItemIcon>
            <ListItemText
              primary="Stoic"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "20px",
                className: "text-black",

              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export { WalletListModal };
