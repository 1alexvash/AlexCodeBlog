import "../styles/root.scss";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/MUI/ThemeProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const slug = typeof window !== "undefined" ? window.location.pathname : "/";
  return (
    <Provider store={store}>
      <GoogleAnalytics />

      <ThemeProvider>
        {pageProps.preview && (
          <div>
            You are in preview-mode
            {/* This link will logout of Tina and exit preview mode */}
            <a
              href={`/admin/index.html#/logout?slug=/api/preview/exit?slug=${slug}`}
            >
              Click here
            </a>{" "}
            to exit
          </div>
        )}
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
