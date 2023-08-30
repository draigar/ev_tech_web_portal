import {
  QueryClient,
  focusManager,
  onlineManager,
  setLogger,
} from "react-query";

export const rootClientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      cacheTime: 3000,
      retry: true,
    },
  },
});
