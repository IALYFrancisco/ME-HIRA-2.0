/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function CreationAndEditingArtistDocumentForm({
    updatingSongFormIsActive,
    updateArtistDocument,
    createArtistDocument,
    closeAddSongModal
}){

    const { handleSubmit } = useForm()

    return(
        <form onSubmit={
            handleSubmit(
                updatingSongFormIsActive ? updateArtistDocument : createArtistDocument
            )}
            className="add-song-modal"
        >
            <span className="close-modal" onClick={ ()=> {closeAddSongModal(); reset()}}>
                <Image src="/images/close.png" width={16} height={16} priority alt="fermer modal d'ajout de chanson"/>
            </span>
            <h2>{ updatingSongFormIsActive ? "Modification" : "Création" } d'un document artiste :</h2>
            <section>
                <fieldset>
                    <div className="form-element">
                        <label htmlFor="name">Nom :</label>
                        <input type="text" placeholder="vrai nom complet de l'artiste" id="name" { ...register('name') }/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="artistName">Nom d'artiste (nom sur scène ou autre) :</label>
                        <input type="text" placeholder="ex: john Doe" id="artistName" { ...register('artistName', {required: true}) } required />
                    </div>
                    <div className="form-element">
                        <label htmlFor="roles">Rôles :</label>
                        <input type="text" placeholder="les rôles dont occupe l'artiste dans le monde artistique" id="roles" { ...register('roles', {required:true}) } required/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="address">Adresse (on vous sollicite de mettre une adresse complète) :</label>
                        <input type="text" placeholder="pays, province, région, quartier, logement, ..." id="address" {...register('address')} />
                    </div>
                    <div className="form-element">
                        <label htmlFor="birthDayAndPlace">Date et lieu de naissance :</label>
                        <input type="text" placeholder="veuillez saisir la date et le lieu de naissance" id="birthDayAndPlace" {...register('birthDayAndPlace')} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-element">
                        <label htmlFor="hostedFile">Photo de l'artiste :</label>
                        <input disabled={localFileIsDefined} type="text" id="hostedFile" placeholder="utilisez cet champ pour une photo déjà mis en ligne" {...register('hostedFile')}/>
                        <input disabled={hostedFileIsDefined} type="file" accept="audio/*,video/*" onChange={handleFileChange}/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="contacts">Contacts :</label>
                        <ul className="contacts-container">
                            <li onClick={toggleContactPhoneNumber} className={ contactPhoneNumberIsActif ? "actif" : "" } title="Numéro téléphone">
                                <Image src="/images/phone.png" width={20} height={20} alt="email input" priority/>
                            </li>
                            <li onClick={toggleContactEmail} className={ contactEmailIsActif ? "actif" : "" } title="Adresse email">
                                <Image src="/images/email.png" width={20} height={20} alt="email input" priority/>
                            </li>
                        </ul>
                        <div className="inputs-container">
                            { 
                                contactPhoneNumberIsActif &&
                                <div className="input-container">
                                    <span>
                                        <Image src="/images/phone.png" width={20} height={20} alt="email input" priority/>
                                    </span>
                                    <input type="tel" id="numberPhone" placeholder="numéro téléphone de l'artiste" title="Numéro téléphone" { ...register("phoneNumber") }/>
                                </div>
                            }
                            { 
                                contactEmailIsActif && 
                                <div className="input-container">
                                    <span>
                                        <Image src="/images/email.png" width={20} height={20} alt="email input" priority/>
                                    </span>
                                    <input type="email" id="email" placeholder="adresse email de l'artiste" title="Adresse email" { ...register("email") }/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-element">
                        <label htmlFor="about">A propos de l'artiste :</label>
                        <textarea placeholder="On peut ajouter ici ce qui ne sont pas dits à propos de l'artiste." id="about" { ...register('about') }></textarea>
                    </div>
                </fieldset>
            </section>
            <div className="form-element">
                <span className={createArtistDocumentIsLoading?"border disabled":"border"}>
                    <button disabled={createArtistDocumentIsLoading || (updatingSongFormIsActive && !isModified) || songActionIsLoading}>
                        {( createArtistDocumentIsLoading || songActionIsLoading ) ? <Image src="/images/black-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> : "Soumettre"}
                    </button>
                </span>
            </div>
        </form>
    )
}