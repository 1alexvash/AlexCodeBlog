import address from "address";
import chalk from "chalk";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [
      "pages",
      "helpers",
      "components",
      "state",
      "redux",
      "helpers",
      "interfaces",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.tina.io"],
  },
  rewrites: async () => [
    {
      source: "/admin",
      destination: "/admin/index.html",
    },
  ],
};

if (isDev) {
  console.log(
    `${chalk.cyanBright(
      "info  -"
    )} On Your Network: http://${address.ip()}:3000`
  );
}

export default nextConfig;
