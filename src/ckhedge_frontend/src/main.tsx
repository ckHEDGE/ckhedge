import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { IdentityKitAuthType } from "@nfid/identitykit";
import { canisterId } from "../../declarations/ckhedge_backend";
import { AuthProvider } from "./hooks/Context";
import "@nfid/identitykit/react/styles.css"
import { IdentityKitProvider } from "@nfid/identitykit/react"

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <IdentityKitProvider
        authType={IdentityKitAuthType.DELEGATION}
        signerClientOptions={{
          targets: [canisterId]
        }}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastContainer />
        </AuthProvider>
      </IdentityKitProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

