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
})

export default withPwa(baseConfig)
