import "../styles/root.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "redux/store";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageProvider from "@/components/MUI/PageProvider";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider storageKey="theme" defaultTheme="dark" enableSystem>
    <Provider store={store}>
      <GoogleAnalytics />
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </Provider>
  </ThemeProvider>
);

export default MyApp;
