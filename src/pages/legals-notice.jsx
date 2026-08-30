import Head from "next/head"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LegalsNotice(){
    return(
        <>
            <Head>
                <title>Mentions légales - Me-Hira</title>
            </Head>
            <Navbar/>
            <section className="legals-notice-container">
                <h1>Mentions légales</h1>
                <h3 className="update-date">Dernière mis à jour : 29 août 2026</h3>
            </section>
            <Footer/>
        </>
    )
}