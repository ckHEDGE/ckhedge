export {};

if (typeof global === "undefined") {
  window.global = window;
}

declare global {
  interface Window {
    ic: any;
  }
}