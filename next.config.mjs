import address from "address";
import chalk from "chalk";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
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
