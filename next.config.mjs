/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ballerz.cloud",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
