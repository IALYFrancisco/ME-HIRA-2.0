/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { formToJSON } from "axios";
import { JoinArrayItems } from "@/helpers/song"

export default function CreationAndEditingArtistDocumentForm({
    updatingSongFormIsActive,
    creationAndEditingArtistDocumentFormState,
    closeAddSongModal,
    localFileIsDefined,
    hostedFileIsDefined,
    handleFileChange,
    contactPhoneNumberIsActif,
    toggleContactEmail,
    contactEmailIsActif,
    createArtistDocumentIsLoading,
    songActionIsLoading,
    setSongActionIsLoading,
    documentToDoAction
}){

    const { register, handleSubmit, reset, watch, formState: { isDirty } } = useForm()

    const [localFile, setLocalFile] = useState('')
    var [hostedFileIsDefined, setHostedFileIsDefined] = useState(false)
    var [localFileIsDefined, setLocalFileIsDefined] = useState(false)

    const isModified = isDirty || localFile

    const watchAll = watch()

    useEffect(()=>{
        if(watchAll.hostedFile){
            setHostedFileIsDefined(true)
        }else{
            setHostedFileIsDefined(false)
        }
    
        if(localFile){
            setLocalFileIsDefined(true)
        }else{
            setLocalFileIsDefined(false)
        }
    },[localFile, watchAll])

    useEffect(()=>{

        if(updatingSongFormIsActive){

            let hostedFileValue = document.image ? document.image : ""
            if(hostedFileValue){
                hostedFileValue = (hostedFileValue.startsWith('http://') || hostedFileValue.startsWith('https://')) ? hostedFileValue : process.env.NEXT_PUBLIC_API_BASE_URL+hostedFileValue
            }

            let artistEmail = document.contacts.email
            let artistPhoneNumber = document.contacts.phoneNumber

            if(artistEmail){
                setContactEmailIsActif(true)
            }
            if(artistPhoneNumber){
                setContactPhoneNumberIsActif(true)
            }

            reset({
                name: documentToDoAction.name,
                artistName: documentToDoAction.artistName,
                roles: JoinArrayItems(documentToDoAction.roles),
                about: documentToDoAction.about,
                address: documentToDoAction.address,
                hostedFile: hostedFileValue,
                birthDayAndPlace: documentToDoAction.birthDayAndPlace,
                email: artistEmail ? artistEmail : "",
                phoneNumber: artistPhoneNumber ? artistPhoneNumber : ""
            })

        }
        
    }, [documentToDoAction, reset, updatingSongFormIsActive])

    const createArtistDocument = async (data) => {
        try{
    
            setCreateArtistDocumentIsLoading(true)
                
            const artistDocument = new FormData()
            const artistContact = new FormData()
    
            // Artist contacts object creation
            if(data.phoneNumber){
                artistContact.append("phoneNumber", data.phoneNumber)
            }
            if(data.email){
                artistContact.append("email", data.email)
            }
                
                // Artist document object création
                artistDocument.append('name', data.name)
                artistDocument.append('artistName', data.artistName)
                artistDocument.append('roles', data.roles)
                artistDocument.append('about', data.about)
                artistDocument.append('address', data.address)
                artistDocument.append('birthDayAndPlace', data.birthDayAndPlace)
                if(data.hostedFile){
                    artistDocument.append('image', data.hostedFile)
                }
                if(localFile){
                    artistDocument.append('file', localFile)
                }
                const response = await api.post(
                    '/artist/create-document',
                    { 
                        artist: formToJSON(artistDocument),
                        contact: formToJSON(artistContact)
                    },
                    {
                        headers: localFileIsDefined ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"}
                    })
                
                if(response.status === 201){
                    api.get('/artist/get')
                        .then((response) => {
                            setArtists(response.data)
                        })
                        .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des documents artiste."))
                    toast.info(`Le document artiste de ${data.artistName} est créé dans la base de donnée.`)
                    reset()
                    setLocalFile(null)
                    closeAddSongModal()
                }
            }catch{
                toast.error(`Erreur de l'ajout du chanson, veuillez réessayer plus tard.`)
            }finally{
                setCreateArtistDocumentIsLoading(false)
            }
        }

    const updateArtistDocument = async (data) => {
        try{
            setSongActionIsLoading(true)
    
            const artist = new FormData()
            const artistContact = new FormData()
    
            if(documentToDoAction.name !== data.name){
                artist.append('name', data.name)
            }
            if(documentToDoAction.artistName !== data.artistName){
                artist.append('artistName', data.artistName)
            }
            if(documentToDoAction.about !== data.about){
                artist.append('about', data.about)
            }
            if(documentToDoAction.address !== data.address){
                artist.append('address', data.address)
            }
            if(documentToDoAction.birthDayAndPlace !== data.birthDayAndPlace){
                artist.append('birthDayAndPlace', data.birthDayAndPlace)
            }
            if(documentToDoAction.contacts.phoneNumber !== data.phoneNumber){
                artistContact.append('phoneNumber', data.phoneNumber)
            }
            if(documentToDoAction.contacts.email !== data.email){
                artistContact.append('email', data.email)
            }
            if(JoinArrayItems(documentToDoAction.roles) !== data.roles){
                artist.append('roles', data.roles)
            }
            let localFileUrl = (
                documentToDoAction.image?.startsWith('https://') ||
                documentToDoAction.image?.startsWith('http://')
            ) ? documentToDoAction.image : process.env.NEXT_PUBLIC_API_BASE_URL+documentToDoAction.image
    
            if(
                (localFileUrl !== data.hostedFile)
                ||(localFile)
            ){    
                if(localFileUrl !== data.hostedFile){
                    artist.append('image', data.hostedFile)
                }
                if(localFile){
                    artist.append('file', localFile)
                }
            }
    
            let update = {}
    
            update.docId = documentToDoAction._id
            if(Object.keys((formToJSON(artist))).length !== 0){
                update.artist = formToJSON(artist)
            }
            if(Object.keys(formToJSON(artistContact)).length !== 0){
                update.artistContact = formToJSON(artistContact)
            }
    
            let response = await api.patch('/artist/update', { update })
            if(response.status === 200){
                toast.info(`Le document artiste de ${documentToDoAction?.artistName} a été bien modifié.`)
                api.get('/artist/get')
                    .then((response) => {
                        setArtists(response.data)
                    })
                    .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des documents artiste."))
            }
        }catch{
            toast.error("Erreur de modification du document, veuillez réessayer plus tard.")
        }finally{
            setSongActionIsLoading(false)
            closeAddSongModal()
            setDocumentToDoAction(null)
            setLocalFile(null)
        }
    }

    const toggleContactPhoneNumber = () => {
        if(contactPhoneNumberIsActif){
            setContactPhoneNumberIsActif(false)
        }else{
            setContactPhoneNumberIsActif(true)
        }
    }

    const toggleContactEmail = () => {
        if(contactEmailIsActif){
            setContactEmailIsActif(false)
        }else{
            setContactEmailIsActif(true)
        }
    }

    return(
        <form onSubmit={
            handleSubmit(
                updatingSongFormIsActive ? updateArtistDocument : createArtistDocument
            )}
            className={ 
                ( updatingSongFormIsActive || creationAndEditingArtistDocumentFormState ) ?
                "document-form-modal enabled" : "document-form-modal"
            }
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