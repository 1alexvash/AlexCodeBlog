import "../styles/root.scss";

import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "redux/store";

import AdminProvider from "@/components/AdminProvider";
import ThemeProvider from "@/components/ThemeProvider";

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

    <AdminProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AdminProvider>
  </Provider>
);

export default MyApp;
