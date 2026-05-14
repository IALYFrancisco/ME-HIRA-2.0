import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/songReader.css";
import "@/styles/authentication/login.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/logo-de-me-hira.png" type="image/png" />
        <meta name="robots" content="index, follow" key="robots" />
        <meta property="og:site_name" content="Me-Hira"/>
        <meta property="og:locale" content="fr_MG"/>
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
