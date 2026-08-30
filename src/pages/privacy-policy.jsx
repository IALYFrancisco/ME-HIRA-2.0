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
                    <li className="terms-and-conditions-item">
                        <h2>5. Données stockées dans le navigateur de l’administrateur</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Le navigateur utilisé pour accéder à l’espace administrateur peut conserver certains éléments nécessaires au fonctionnement de l’application.</p>
                            </li>
                            <li>
                                <p>Ces éléments comprennent notamment :</p>
                                <p>-<strong> LocalStorage :</strong> « at.sid » , « me-hira-color-mode »</p>
                                <p>-<strong> Cookie HTTP-only :</strong> « rt.sid »</p>
                            </li>
                            <li>
                                <p>Ces éléments sont destinés au fonctionnement de l’authentification et à la gestion des préférences d’affichage.</p>
                            </li>
                            <li>
                                <p>Ils ne constituent pas un système de suivi des visiteurs publics.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>6. Finalités des traitements</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les informations traitées dans le cadre de l’espace administrateur peuvent être utilisées notamment pour :</p>
                                <p>- authentifier l’administrateur</p>
                                <p>- maintenir sa session</p>
                                <p>- renouveler son authentification</p>
                                <p>- permettre la récupération du compte</p>
                                <p>- sécuriser l’espace administrateur</p>
                                <p>- gérer les préférences d’affichage</p>
                                <p>- permettre l’administration des contenus</p>
                                <p>- empêcher les accès non autorisés.</p>
                            </li>
                            <li>
                                <p>Ces informations ne sont actuellement pas utilisées à des fins de publicité comportementale ou de profilage commercial.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>7. Données relatives aux artistes et professionnels de la musique</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira peut conserver dans ses bases internes des informations relatives à des artistes, chanteurs, auteurs, compositeurs, musiciens et autres personnes liées au domaine musical malagasy.</p>
                            </li>
                            <li>
                                <p>Les informations susceptibles d’être conservées peuvent notamment comprendre :</p>
                                <p>- nom complet</p>
                                <p>- nom ou pseudonyme artistique</p>
                                <p>- activité ou occupation dans le domaine musical</p>
                                <p>- informations biographiques</p>
                                <p>- adresse</p>
                                <p>- image</p>
                                <p>- date de naissance</p>
                                <p>- lieu de naissance</p>
                                <p>- autres informations documentaires.</p>
                            </li>
                            <li>
                                <p>Ces informations sont collectées et conservées dans le cadre interne de documentation et de gestion du projet Me-Hira.</p>
                            </li>
                            <li>
                                <p>Certaines informations peuvent provenir de sources publiques accessibles en ligne.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>8. Informations internes non destinées à la publication</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Certaines informations relatives aux artistes et aux personnes référencées dans les bases internes peuvent être considérées comme des informations internes.</p>
                            </li>
                            <li>
                                <p>Ces informations ne sont pas destinées à être publiées sur la plateforme et leur accès est limité aux personnes autorisées à administrer Me-Hira.</p>
                            </li>
                            <li>
                                <p>Me-Hira ne publie pas volontairement une information interne simplement parce qu’elle a été enregistrée dans sa base de données.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>9. Sources des informations</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Certaines informations peuvent provenir de sources publiques accessibles en ligne, de documents accompagnant les œuvres, de supports physiques ou de fichiers communiqués à l’Équipe Me-Hira.</p>
                            </li>
                            <li>
                                <p>Le fait qu’une information soit accessible publiquement en ligne ne signifie pas nécessairement qu’elle puisse être réutilisée sans aucune restriction.</p>
                            </li>
                            <li>
                                <p>Me-Hira traite les demandes de correction, de suppression ou de retrait conformément au cadre applicable.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>10. Finalités de la documentation</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les informations relatives aux artistes et aux œuvres peuvent être utilisées notamment afin de :</p>
                                <p>- documenter le patrimoine musical malagasy</p>
                                <p>- identifier les personnes ayant participé à une œuvre</p>
                                <p>- organiser le catalogue de Me-Hira</p>
                                <p>- améliorer la qualité des informations associées aux œuvres</p>
                                <p>- répondre aux demandes et réclamations</p>
                                <p>- gérer et administrer la plateforme.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>11. Données communiquées par e-mail</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Lorsqu’une personne contacte Me-Hira par courrier électronique, les informations communiquées volontairement dans son message peuvent être utilisées afin de :</p>
                                <p>- répondre à sa demande</p>
                                <p>- vérifier une réclamation</p>
                                <p>- traiter une demande de retrait</p>
                                <p>- traiter une demande de rectification</p>
                                <p>- traiter une demande de suppression</p>
                                <p>- assurer le suivi d’une demande juridique ou technique.</p>
                            </li>
                            <li>
                                <p>Les informations nécessaires au traitement de la demande peuvent être conservées pendant la durée raisonnablement nécessaire à son traitement et, lorsque cela est nécessaire, à la gestion d’un éventuel litige.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>12. Réclamations relatives aux œuvres</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Lorsqu’un titulaire de droits ou toute autre personne adresse une demande concernant une œuvre présente sur Me-Hira, les informations fournies dans cette demande peuvent être conservées afin de vérifier la réclamation et de prendre les mesures appropriées.</p>
                            </li>
                            <li>
                                <p>Ces informations peuvent notamment comprendre l’identité du demandeur, ses coordonnées, l’identification de l’œuvre concernée et les éléments justificatifs transmis.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>13. Prestataires techniques</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira utilise ou peut utiliser différents prestataires techniques nécessaires à son fonctionnement.</p>
                            </li>
                            <li>
                                <p>À la date de la présente politique, l’infrastructure de Me-Hira utilise notamment :</p>
                                <p>-<strong> Render :</strong> pour l’hébergement</p>
                                <p>-<strong> GitHub / Git LFS :</strong> pour certains besoins de stockage et de gestion de fichiers</p>
                                <p>-<strong> jsDelivr :</strong> pour la distribution de certains fichiers statiques ou multimédias</p>
                                <p>-<strong> Brevo :</strong> pour certains services d’envoi d’e-mails.</p>
                            </li>
                            <li>
                                <p>La liste des prestataires peut évoluer en fonction des besoins techniques de Me-Hira.</p>
                            </li>
                            <li>
                                <p>Chaque prestataire peut appliquer ses propres conditions d’utilisation et politiques de confidentialité.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>14. Hébergement et traitement par des prestataires</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Certains prestataires techniques utilisés par Me-Hira peuvent être établis ou exploiter des infrastructures situées en dehors de Madagascar.</p>
                            </li>
                            <li>
                                <p>Lorsque des données à caractère personnel sont concernées, les traitements sont réalisés conformément aux règles applicables et aux mesures techniques ou contractuelles pertinentes lorsqu’elles sont nécessaires.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>15. Durée de conservation</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira ne conserve pas volontairement les données personnelles des visiteurs publics dans le but de constituer un historique de leur utilisation du service.</p>
                            </li>
                            <li>
                                <p>Les données liées à l’administration sont conservées pendant la durée nécessaire au fonctionnement et à la sécurisation du compte administrateur.</p>
                            </li>
                            <li>
                                <p>Les informations relatives aux demandes adressées par e-mail peuvent être conservées pendant la durée nécessaire au traitement de la demande et, lorsque cela est nécessaire, à la défense des droits et intérêts de Me-Hira.</p>
                            </li>
                            <li>
                                <p>Les informations documentaires relatives aux artistes peuvent être conservées aussi longtemps qu’elles sont nécessaires aux objectifs internes de documentation et de gestion de Me-Hira, sous réserve des droits reconnus aux personnes concernées et de la législation applicable.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>16. Sécurité</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira met en œuvre des mesures techniques raisonnables destinées à protéger les informations contre les accès, modifications, destructions ou divulgations non autorisés.</p>
                            </li>
                            <li>
                                <p>L’espace administrateur est notamment protégé par un mécanisme d’authentification.</p>
                            </li>
                            <li>
                                <p>Les mots de passe ne sont pas destinés à être stockés en clair.</p>
                            </li>
                            <li>
                                <p>Les jetons d’authentification sont utilisés conformément à leur finalité de sécurité.</p>
                            </li>
                            <li>
                                <p>Malgré ces mesures, aucune transmission ou infrastructure informatique accessible par Internet ne peut garantir une sécurité absolue.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>17. Droits des personnes</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Conformément à la législation applicable et sous réserve des conditions prévues par celle-ci, les personnes concernées peuvent notamment disposer de droits relatifs à leurs données personnelles, notamment des droits d’accès, de rectification et, lorsque les conditions légales sont réunies, de suppression ou d’opposition au traitement.</p>
                            </li>
                            <li>
                                <p>Toute demande peut être adressée à : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                            </li>
                            <li>
                                <p>Me-Hira examinera la demande conformément à la législation applicable.</p>
                            </li>
                            <li>
                                <p>Lorsque cela est nécessaire afin de protéger les données d’une personne contre une demande frauduleuse, Me-Hira peut demander des éléments permettant de vérifier l’identité du demandeur.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>18. Modifications de la politique</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>La présente politique peut être modifiée afin de tenir compte notamment :</p>
                                <p>- de l’évolution de Me-Hira</p>
                                <p>- de l’évolution de son infrastructure</p>
                                <p>- de l’introduction de nouvelles fonctionnalités</p>
                                <p>- de l’utilisation de nouveaux prestataires</p>
                                <p>- de l’évolution de la législation applicable.</p>
                            </li>
                            <li>
                                <p>La version publiée sur Me-Hira constitue la version en vigueur.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>19. Contact</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Pour toute question concernant la présente Politique de confidentialité ou l’exercice d’un droit relatif aux données personnelles :</p>
                                <p><strong>E-mail : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></strong></p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>20. Entrée en vigueur</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>La présente Politique de confidentialité entre en vigueur à compter de sa publication sur Me-Hira.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </>
    )
}