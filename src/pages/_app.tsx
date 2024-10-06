import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <ClerkProvider {...pageProps}>
        <Head>
          <title>Emojer</title>
          <meta name="description" content="🤔" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer position="bottom-center" theme="dark" />
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
