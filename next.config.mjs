/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ['127.0.0.1'],
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      port: '1234',
      pathname: "/**"
    }]
  },
  output: 'export'
};

export default nextConfig;
