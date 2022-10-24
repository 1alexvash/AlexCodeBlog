export const GA_TRACKING_ID = "G-1JHZSH8YH4";

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_location: url,
  });
};
