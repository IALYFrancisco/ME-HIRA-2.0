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
                    <li className="terms-and-conditions-item">
                        <h2>3. Données techniques des visiteurs</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>À la date de publication de la présente politique, Me-Hira ne met pas volontairement en place un système interne destiné à enregistrer et conserver les adresses IP, les historiques de navigation, les historiques d’écoute ou les journaux techniques des visiteurs à des fins d’analyse ou de profilage.</p>
                            </li>
                            <li>
                                <p>Toutefois, le fonctionnement technique d’un service accessible sur Internet peut nécessiter l’intervention de prestataires d’hébergement ou d’infrastructure susceptibles de traiter certaines informations techniques dans le cadre de leurs propres services.</p>
                            </li>
                            <li>
                                <p>Ces éventuels traitements sont soumis aux conditions et politiques de confidentialité des prestataires concernés.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>4. Espace administrateur</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira dispose d’un espace administrateur privé.</p>
                            </li>
                            <li>
                                <p>À la date de la présente politique, cet espace est accessible uniquement à l’administrateur autorisé de la plateforme.</p>
                            </li>
                            <li>
                                <p>Les informations nécessaires au fonctionnement de l’espace administrateur peuvent notamment comprendre :</p>
                                <p>- une adresse e-mail utilisée pour l’authentification</p>
                                <p>- des informations d’identification</p>
                                <p>- des jetons d’accès</p>
                                <p>- des jetons nécessaires au renouvellement de l’authentification</p>
                                <p>- des informations nécessaires à la récupération du compte</p>
                                <p>- des préférences d’affichage.</p>
                            </li>
                            <li>
                                <p>Ces informations sont utilisées exclusivement pour assurer l’authentification, la sécurité et le fonctionnement de l’espace administrateur.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </>
    )
}