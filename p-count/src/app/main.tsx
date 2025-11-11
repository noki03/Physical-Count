import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "../styles/globals.css";

// ✅ Extend Window type to avoid TS2339
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__?: QueryClient;
  }
}

// ✅ Create QueryClient once
const queryClient = new QueryClient();

// ✅ Optional: expose for debugging
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
