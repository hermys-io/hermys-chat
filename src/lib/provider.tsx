"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Provider as JotaiProvider, createStore } from "jotai";
import { useState } from "react";

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

  const [store] = useState(() => createStore());

  return (
    <PostHogProvider client={posthog}>
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </PostHogProvider>
  );
};

export default Provider;
