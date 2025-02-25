import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AppContextsProviders } from "./components/Contexts/app-providers.ts";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import { CACHE_TIME, STALE_TIME } from "./components/utils/utils.ts";

const queryClient = new QueryClient({
  mutationCache: new MutationCache(),
  queryCache: new QueryCache(),
  defaultOptions: {
    // queries: {
    //   staleTime: STALE_TIME,
    //   gcTime: CACHE_TIME,
    // },
  },
});
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppContextsProviders>
        <App />
        <ToastContainer />
      </AppContextsProviders>
    </QueryClientProvider>
  </BrowserRouter>
);
