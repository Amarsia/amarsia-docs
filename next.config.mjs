import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/amarsia-assets/**",
      },
    ],
  },
}

const withMDX = createMDX()

export default withMDX(config)
