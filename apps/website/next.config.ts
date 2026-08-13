import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@starter/ui', '@starter/types', '@starter/api'],
};

export default nextConfig;
