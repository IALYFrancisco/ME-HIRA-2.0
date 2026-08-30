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
                <h3 className="update-date">Dernière mis à jour : 29 août 2026</h3>
                <ul>
                    <li className="terms-and-conditions-item">
                        <h2>1. Objet</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>La présente Politique de confidentialité décrit les informations traitées dans le cadre de Me-Hira ainsi que les finalités de ces traitements.</p>
                            </li>
                            <li>
                                <p>Me-Hira accorde une importance particulière au respect de la vie privée et à la protection des données à caractère personnel.</p>
                            </li>
                            <li>
                                <p>Cette politique est destinée à refléter le fonctionnement actuel de la plateforme et pourra être mise à jour lorsque de nouvelles fonctionnalités, de nouveaux services ou de nouveaux traitements seront intégrés.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>2. Accès public à Me-Hira</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>L’accès aux fonctionnalités publiques de Me-Hira ne nécessite pas la création d’un compte.</p>
                            </li>
                            <li>
                                <p>À la date de la présente politique, Me-Hira ne met pas en œuvre de système interne destiné à créer des profils utilisateurs, à effectuer du ciblage publicitaire ou à analyser individuellement le comportement des visiteurs.</p>
                            </li>
                            <li>
                                <p>Me-Hira n’utilise actuellement pas :</p>
                                <p>- Google Analytics</p>
                                <p>- Facebook Pixel</p>
                                <p>- de cookies publicitaires</p>
                                <p>- de système de publicité comportementale</p>
                                <p>- de compte utilisateur public</p>
                                <p>- de système de commentaires</p>
                                <p>- de système de publication de contenu par les visiteurs.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </>
    )
}