/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@neondatabase/serverless'];
    }

    // Add Docker-friendly hot reloading configuration
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: /node_modules/,
      };
    }

    return config;
  },
}

export default nextConfig;
