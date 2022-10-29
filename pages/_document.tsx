import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Script src="/scripts/fonts.js" />
          <Script src="/scripts/theme.js" />
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
