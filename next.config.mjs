import NextBundleAnalyzer from "@next/bundle-analyzer";
import address from "address";
import chalk from "chalk";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

NextBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

NextBundleAnalyzer({
  reactStrictMode: true,
});

if (process.env.NODE_ENV === "development") {
  console.log(
    chalk.cyanBright("info  -"),
    "On Your Network:",
    `http://${address.ip()}:3000`
  );
}

export default nextConfig;
