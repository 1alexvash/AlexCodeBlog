import "../styles/root.scss";

import AdminProvider from "components/AdminProvider";
import GoogleAnalytics from "components/GoogleAnalytics";
import ThemeProvider from "components/MUI/ThemeProvider";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <GoogleAnalytics />

    <AdminProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AdminProvider>
  </Provider>
);

export default MyApp;
