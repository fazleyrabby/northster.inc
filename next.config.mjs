/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack by default as it can be resource-heavy on some Mac setups
  // If you prefer Turbopack, you can run 'next dev --turbo'
  
  images: {
    // Prevent Next.js from aggressively optimizing large images in dev
    remotePatterns: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Experimental optimization to reduce memory footprint
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
