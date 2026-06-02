import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/songReader.css";
import "@/styles/dashboard/song.css";
import "@/styles/authentication/login.css";
import "@/styles/authentication/resetPassword.css";
import "@/styles/authentication/forgottenPassword.css";
import "@/styles/skeleton-loaders/home.css"
import "@/styles/skeleton-loaders/songReaderSkeleton.css"
import "@/styles/skeleton-loaders/songsListSkeleton.css"
import Head from "next/head";
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/logo-de-me-hira.png" type="image/png" />
        <meta name="robots" content="index, follow" key="robots" />
        <meta property="og:site_name" content="Me-Hira"/>
        <meta property="og:locale" content="fr_MG"/>
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Toaster className="toast" position='top-center' richColors/>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
