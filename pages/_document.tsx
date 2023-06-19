/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="en">
    <Head>
      <Script src="/scripts/theme.js" strategy="beforeInteractive" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
