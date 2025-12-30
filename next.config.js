/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Activer le hot reload et le fast refresh
  reactStrictMode: true,
  // Désactiver certaines optimisations qui peuvent causer des problèmes de permissions
  webpack: (config, { isServer }) => {
    // Ignorer les erreurs de permissions sur les fichiers node_modules
    config.ignoreWarnings = [
      { module: /node_modules/ },
    ];
    return config;
  },
  // Utiliser le système de fichiers de manière plus permissive
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig
