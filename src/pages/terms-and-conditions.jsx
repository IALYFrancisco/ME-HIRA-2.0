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
                    <li className="terms-and-conditions-item">
                        <h2>2. Définitions</h2>
                        <p className="sub-text">Dans le cadre des présentes CGU :</p>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p><strong>« Me-Hira » :</strong> désigne la plateforme numérique et ses différentes interfaces, fonctionnalités et services.</p>
                            </li>
                            <li>
                                <p><strong>« Équipe Me-Hira » :</strong> désigne les personnes responsables de la gestion éditoriale et opérationnelle de la plateforme.</p>
                            </li>
                            <li>
                                <p><strong>« LUMINI » :</strong> désigne l’agence web ayant conçu et développé la plateforme technique Me-Hira.</p>
                            </li>
                            <li>
                                <p><strong>« Utilisateur »</strong> ou <strong>« Visiteur » :</strong> désigne toute personne accédant à la partie publique de Me-Hira.</p>
                            </li>
                            <li>
                                <p><strong>« Contenu » :</strong> désigne notamment les fichiers audio et vidéo, images, textes, informations descriptives et autres éléments accessibles sur Me-Hira.</p>
                            </li>
                            <li>
                                <p><strong>« Œuvre » :</strong> désigne notamment une œuvre musicale, audiovisuelle ou toute autre création susceptible d’être protégée par les règles applicables en matière de propriété intellectuelle.</p>
                            </li>
                            <li>
                                <p><strong>« Titulaire de droits » :</strong> désigne toute personne physique ou morale pouvant justifier de droits sur une œuvre, un enregistrement, une interprétation ou un autre contenu.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>3. Acceptation des CGU</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>L’accès et l’utilisation de Me-Hira impliquent la prise de connaissance et l’acceptation des présentes CGU.</p>
                            </li>
                            <li>
                                <p>Toute personne qui n’accepte pas ces conditions doit s’abstenir d’utiliser la plateforme.</p>
                            </li>
                            <li>
                                <p>Les présentes CGU peuvent être modifiées à tout moment afin de tenir compte de l’évolution de Me-Hira, de ses fonctionnalités, de son organisation, de son infrastructure ou du cadre légal applicable.</p>
                            </li>
                            <li>
                                <p>La version publiée sur la plateforme est la version en vigueur.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
            <Footer/>
        </>
    )
}