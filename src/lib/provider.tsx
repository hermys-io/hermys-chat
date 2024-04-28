"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

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

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default Provider;
