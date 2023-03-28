import config from "config";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "redux/typesHooks";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PortfolioPage from "@/components/Portfolio";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import PageProgress from "@/components/Post/PageProgress";
import StandWithUkraine from "@/components/StandWithUkraine";

const Home: NextPage = () => {
  const admin = useAppSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      router.push("/404");
    }
  }, [admin, router]);

  return (
    <>
      <Head>
        <title>{config.site_title}</title>
        <meta property="og:title" content={config.site_keywords[1]} />
        <meta property="og:description" content={config.site_description} />
        <meta property="og:url" content={config.host_url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.site_title} />
        <meta name="description" content={config.site_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <BreadCrumbs title="Projects" />
      <PageProgress />
      <section className="simple-section">
        <div className="container">
          <PortfolioPage />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
