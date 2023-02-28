import "../styles/root.scss";

import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "redux/store";

import ThemeProvider from "@/components/MUI/ThemeProvider";

const GA_TRACKING_ID = "G-1JHZSH8YH4";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    {/* Google Analytics */}
    <Script
      async
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script strategy="lazyOnload" id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
          
        gtag('config', '${GA_TRACKING_ID}');
      `}
    </Script>

    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

export default MyApp;
