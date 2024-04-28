/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    POSTHOG_HOST: process.env.POSTHOG_HOST,
  },
};

export default nextConfig;
