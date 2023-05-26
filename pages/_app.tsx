import "../styles/root.scss";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";

import GoogleAnalytics from "@/components/GoogleAnalytics";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <GoogleAnalytics />

    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
