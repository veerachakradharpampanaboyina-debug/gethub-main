
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
  },
   webpack: (config, { isServer }) => {
    // This is a workaround to "opt-out" of server-side rendering for jspdf
    // See: https://github.com/mrrio/jsPDF/issues/2705
    if (isServer) {
      config.externals = [...config.externals, 'jspdf'];
    }
    return config;
  },
};

export default nextConfig;
