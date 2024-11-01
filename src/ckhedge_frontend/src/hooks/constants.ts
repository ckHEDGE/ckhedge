export const network = process.env.DFX_NETWORK || "local";
export const host = network === "ic" ? "https://ic0.app" : "http://localhost:4943";