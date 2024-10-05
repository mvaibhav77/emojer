import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <ClerkProvider {...pageProps}>
        <ToastContainer position="bottom-center" theme="dark" />
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
