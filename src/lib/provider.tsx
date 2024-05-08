"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Provider as JotaiProvider, createStore } from "jotai";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (typeof window !== "undefined") {
  posthog.init(process.env.POSTHOG_KEY!, {
    api_host: process.env.POSTHOG_HOST,
  });
}

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = (props: ProviderProps) => {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());
  const [store] = useState(() => createStore());

  return (
    <PostHogProvider client={posthog}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={store}>{children}</JotaiProvider>
      </QueryClientProvider>
    </PostHogProvider>
  );
};

export default Provider;
