import Head from "next/head"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link"

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
                <ul>
                    <li className="terms-and-conditions-item">
                        <h2>1. Identification de la plateforme</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p><strong>Nom :</strong> Me-Hira</p>
                            </li>
                            <li>
                                <p><strong>Adresse actuellement utilisée :</strong> <Link href="/">https://mehira.onrender.com</Link></p>
                            </li>
                            <li>
                                <p>Me-Hira est une plateforme numérique consacrée à la préservation, à la conservation et à la consultation d’œuvres musicales malagasy.</p>
                            </li>
                            <li>
                                <p>La plateforme a notamment pour objectif de contribuer à la conservation numérique de chansons et d’œuvres musicales devenues difficiles ou impossibles à retrouver en ligne.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
            <Footer/>
        </>
    )
}