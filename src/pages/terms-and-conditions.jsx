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
                                <p>Les présentes Conditions générales d’utilisation (CGU) définissent les conditions d’accès et d’utilisation de la plateforme Me-Hira.</p>
                            </li>
                            <li>
                                <p>Me-Hira est une plateforme numérique consacrée à la préservation, à la conservation et à la consultation d’œuvres musicales malagasy.</p>
                            </li>
                            <li>
                                <p>La plateforme a notamment pour objectif de contribuer à la conservation numérique de chansons et d’œuvres musicales malagasy qui peuvent être devenues difficiles ou impossibles à retrouver en ligne ou auprès des sources de diffusion habituelles.</p>
                            </li>
                            <li>
                                <p>Me-Hira permet notamment aux visiteurs de consulter un catalogue d’œuvres, d’effectuer des recherches et de lire certains contenus audio ou vidéo directement depuis la plateforme.</p>
                            </li>
                            <li>
                                <p>L’accès au catalogue public et aux fonctionnalités de consultation ne nécessite pas la création d’un compte utilisateur.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
            <Footer/>
        </>
    )
}