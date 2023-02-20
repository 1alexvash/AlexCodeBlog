import NextBundleAnalyzer from "@next/bundle-analyzer";
import address from "address";
import chalk from "chalk";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

if (process.env.NODE_ENV === "development") {
  console.log(
    chalk.cyanBright("info  -"),
    "On Your Network:",
    `http://${address.ip()}:3000`
  );
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
