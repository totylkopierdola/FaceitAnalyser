/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*", "assets.faceit.com", "distribution.faceit-cdn.net"],
  },
};

export default nextConfig;
