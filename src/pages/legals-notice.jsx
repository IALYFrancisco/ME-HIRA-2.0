import Head from "next/head"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link"

export default function LegalsNotice(){

    const pageSEODescription = "Consultez les informations légales de Me-Hira : responsable, développement, hébergement, propriété intellectuelle et moyens de contact."

    return(
        <>
            <Head>
                <title>Mentions légales - Me-Hira</title>
                <link rel="canonical" href="https://mehira.onrender.com/legals-notice" />
                <meta name="description" content={pageSEODescription}/>
                <meta property="og:title" content="Mentions légales - Me-Hira" />
                <meta property="og:url" content="https://mehira.onrender.com/legals-notice" />
                <meta property="og:description" content={pageSEODescription}/>
                <meta name="twitter:title" content="Mentions légales - Me-Hira" />
                <meta name="twitter:description" content={pageSEODescription} />
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
                    <li className="terms-and-conditions-item">
                        <h2>2. Responsable de la gestion et de la publication</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira est actuellement un projet indépendant administré par son équipe de gestion.</p>
                            </li>
                            <li>
                                <p><strong>Responsable actuel de la gestion et de la publication :</strong> IALY Francisco Raymond</p>
                            </li>
                            <li>
                                <p><strong>Adresse électronique :</strong> <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                            </li>
                            <li>
                                <p>Ces informations pourront être mises à jour lorsque Me-Hira sera éventuellement constituée sous une structure juridique dédiée.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>3. Développement technique</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>La plateforme Me-Hira a été conçue et développée par LUMINI, une agence web/startup spécialisée dans la conception et le développement de sites web et d’applications web.</p>
                            </li>
                            <li>
                                <p>LUMINI intervient dans le cadre de Me-Hira en qualité de prestataire de conception et de développement technique.</p>
                            </li>
                            <li>
                                <p>LUMINI ne revendique aucun droit de propriété sur les œuvres musicales ou audiovisuelles référencées ou diffusées sur Me-Hira du seul fait de son intervention technique.</p>
                            </li>
                            <li>
                                <p>Les décisions relatives à la sélection, à la publication, à la dépublication, à la modification ou à la suppression des contenus relèvent de l’Équipe Me-Hira.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>4. Situation de LUMINI</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>LUMINI est actuellement une startup/agence web en phase de développement.</p>
                            </li>
                            <li>
                                <p>À la date de publication des présentes Mentions légales, LUMINI n’est pas encore constituée sous une forme juridique définitive.</p>
                            </li>
                            <li>
                                <p>Les informations relatives à son statut juridique pourront être mises à jour lorsque sa constitution juridique sera finalisée.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>5. Hébergement</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>La plateforme Me-Hira est actuellement hébergée auprès de <strong>Render</strong>.</p>
                            </li>
                            <li>
                                <p>L’infrastructure comprend notamment les composants nécessaires à l’hébergement de l’interface web et des services applicatifs de Me-Hira.</p>
                            </li>
                            <li>
                                <p>Les services d’hébergement sont soumis aux conditions applicables du prestataire concerné.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>6. Services techniques complémentaires</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira peut également utiliser des services techniques tiers pour certaines fonctions, notamment :</p>
                                <p>- <strong>GitHub</strong> et <strong>Git LFS</strong> pour certains besoins de stockage et de gestion de fichiers</p>
                                <p>- <strong>jsDelivr</strong> pour la distribution de certains fichiers statiques ou multimédias</p>
                                <p>- <strong>Brevo</strong> pour certains services d’envoi d’e-mails.</p>
                            </li>
                            <li>
                                <p>Cette liste peut évoluer en fonction des besoins techniques de la plateforme.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>7. Propriété intellectuelle de la plateforme</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>La structure, l’interface, le design, le code source, les éléments graphiques, les logos, les textes originaux et les éléments techniques propres à Me-Hira peuvent être protégés par les droits de propriété intellectuelle applicables.</p>
                            </li>
                            <li>
                                <p>Sauf autorisation expresse ou disposition légale contraire, leur reproduction, modification, distribution ou exploitation sans autorisation est interdite.</p>
                            </li>
                            <li>
                                <p>Cette protection est distincte des droits pouvant appartenir aux auteurs, interprètes, producteurs ou autres titulaires de droits sur les œuvres musicales et audiovisuelles accessibles sur la plateforme.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>8. Droits sur les œuvres</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les œuvres musicales, enregistrements sonores, vidéos, photographies et autres contenus présents sur Me-Hira peuvent appartenir à des auteurs, compositeurs, artistes-interprètes, producteurs, éditeurs ou autres titulaires de droits.</p>
                            </li>
                            <li>
                                <p>Me-Hira ne revendique pas automatiquement la propriété de ces œuvres.</p>
                            </li>
                            <li>
                                <p>La présence d’un contenu sur la plateforme ne doit pas être interprétée comme une déclaration selon laquelle Me-Hira, son équipe ou LUMINI serait titulaire de l’ensemble des droits relatifs à ce contenu.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>9. Demande de retrait</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Toute personne estimant qu’un contenu disponible sur Me-Hira porte atteinte à ses droits peut adresser une demande de retrait ou de dépublication à : <strong><a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></strong></p>
                            </li>
                            <li>
                                <p>Afin de faciliter le traitement de la demande, celle-ci doit autant que possible identifier :</p>
                                <p>- le demandeur</p>
                                <p>- ses coordonnées</p>
                                <p>- le contenu concerné</p>
                                <p>- l’adresse de la page concernée</p>
                                <p>- la nature du droit invoqué</p>
                                <p>- les motifs de la demande</p>
                                <p>- tout élément permettant de justifier la demande.</p>
                            </li>
                            <li>
                                <p>L’Équipe Me-Hira examine les demandes reçues et peut procéder à une dépublication, une suppression, une modification ou toute autre mesure appropriée.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>10. Données relatives aux personnes</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira peut conserver, dans ses bases internes et à des fins de documentation, des informations relatives à des artistes, chanteurs, auteurs, compositeurs, musiciens et autres personnes liées au domaine musical malagasy.</p>
                            </li>
                            <li>
                                <p>Certaines de ces informations peuvent provenir de sources publiques.</p>
                            </li>
                            <li>
                                <p>Les informations internes qui ne sont pas destinées à la publication ne sont pas rendues publiques par Me-Hira.</p>
                            </li>
                            <li>
                                <p>Toute personne concernée peut adresser une demande de rectification ou de suppression à : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>11. Exactitude des informations</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Me-Hira s’efforce de maintenir des informations exactes et pertinentes.</p>
                            </li>
                            <li>
                                <p>Cependant, certaines données peuvent provenir de sources externes et être anciennes, incomplètes ou contradictoires.</p>
                            </li>
                            <li>
                                <p>Toute personne constatant une erreur peut demander sa vérification et, lorsque cela est approprié, sa correction.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>12. Protection des données personnelles</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les informations relatives au traitement des données personnelles sont détaillées dans la <Link href="/privacy-policy">Politique de confidentialité de Me-Hira</Link>.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>13. Contact</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Pour toute demande concernant Me-Hira, les contenus, les droits de propriété intellectuelle, les informations relatives aux personnes ou la plateforme :</p>
                                <p><strong>E-mail : <a href="mailto:ialyfrancisco7@gmail.com">ialyfrancisco7@gmail.com</a></strong></p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>14. Droit applicable</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les présentes Mentions légales sont établies dans le cadre du droit applicable à Madagascar, sous réserve des règles impératives éventuellement applicables.</p>
                            </li>
                            <li>
                                <p>Les questions relatives aux droits d’auteur, aux droits des personnes, aux données personnelles et à l’utilisation de la plateforme sont traitées conformément aux règles légalement applicables.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="terms-and-conditions-item">
                        <h2>15. Mise à jour</h2>
                        <ul className="terms-and-conditions-subitem-container">
                            <li>
                                <p>Les présentes Mentions légales peuvent être modifiées notamment en cas :</p>
                                <p>- de changement de responsable</p>
                                <p>- de constitution juridique de Me-Hira</p>
                                <p>- de constitution juridique de LUMINI</p>
                                <p>- de changement d’hébergement</p>
                                <p>- de changement de prestataires techniques</p>
                                <p>- de changement de nom de domaine</p>
                                <p>- d’évolution de l’organisation de Me-Hira.</p>
                            </li>
                            <li>
                                <p>La version publiée sur la plateforme constitue la version en vigueur.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
            <Footer/>
        </>
    )
}