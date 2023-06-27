import "../styles/root.scss";

import { css, CssBaseline, GlobalStyles } from "@mui/material";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "redux/store";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageProvider from "@/components/MUI/PageProvider";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Provider store={store}>
      <GoogleAnalytics />

      <PageProvider>
        <CssBaseline />
        <GlobalStyles
          styles={css`
            :root {
              body {
                color: #616161;
                background: #fff;
              }
            }
            [data-theme="dark"] {
              body {
                background: #18191d;
                color: #f2f5f7;
              }
            }
          `}
        />
        <Component {...pageProps} />
      </PageProvider>
    </Provider>
  </ThemeProvider>
);

export default MyApp;
