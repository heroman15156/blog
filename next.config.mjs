/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // experimental: {
  //   staleTimes: {
  //     dynamic: 5,
  //     static: 60,
  //   },
  // },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
    ],
  },
};

export default nextConfig;
