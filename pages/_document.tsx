/* eslint-disable @next/next/no-sync-scripts */
import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="/scripts/fonts.js" />
          <script src="/scripts/theme.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
