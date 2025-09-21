import withPWA from "next-pwa"

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

const withPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Avoid GenerateSW being called repeatedly in dev (HMR/watch mode)
  disable: process.env.NODE_ENV === "development",
  // PWA configuration
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
  // Build exclusion patterns
  buildExcludes: [/middleware-manifest\.json$/],
  // Fallback to offline page
  fallbacks: {
    document: "/offline",
  },
})

export default withPwa(baseConfig)
