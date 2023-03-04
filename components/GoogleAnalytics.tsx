import Script from "next/script";

const GoogleAnalyticsId = "G-1JHZSH8YH4";

const GoogleAnalytics = () => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsId}`}
      strategy="afterInteractive"
    />
    <Script strategy="afterInteractive" id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${GoogleAnalyticsId}');
      `}
    </Script>
  </>
);

export default GoogleAnalytics;
