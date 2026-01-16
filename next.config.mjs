/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This allows shadcn/ui components like Tabs that internally use useSearchParams
  // to work without causing prerender errors during build
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
