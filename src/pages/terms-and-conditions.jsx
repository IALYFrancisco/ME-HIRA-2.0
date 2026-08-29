import Head from "next/head"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsAndConditions(){
    return(
        <>
            <Head>
                <title>Conditions générales d'utilisation - Me-Hira</title>
            </Head>
            <Navbar/>
            <section className="terms-and-conditions-container">
                <h1>Conditions générales d'utilisation</h1>
                <h3 className="update-date">Dernière mis à jour : 29 août 2026</h3>
                <ul>
                    <li className="terms-and-conditions-item">
                        <h2>1. Objet</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les présentes conditions générales régissent l’utilisation de la plateforme LUMINI School ainsi que les modalités d’inscription et de participation aux formations proposées.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
            <Footer/>
        </>
    )
}