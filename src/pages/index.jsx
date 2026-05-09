import Head from "next/head";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Me-Hira</title>
      </Head>
      <section className="homepage-container">
        <Navbar/>
      </section>
    </>
  );
}