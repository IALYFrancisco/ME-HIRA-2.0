import Head from "next/head"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
    return(
        <>
            <Head>
                <title>Politique de confidentialité - Me-Hira</title>
            </Head>
            <Navbar/>
            <section className="privacy-policy-container">
                <h1>Politique de confidentialité</h1>
            </section>
        </>
    )
}