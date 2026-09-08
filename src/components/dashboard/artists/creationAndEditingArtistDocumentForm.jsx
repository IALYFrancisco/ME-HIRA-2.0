/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { JoinArrayItems } from "@/helpers/song"
import { toast } from "sonner";
import { api } from "@/helpers/api";
import TomSelect from "tom-select"
import "tom-select/dist/css/tom-select.css"

export default function CreationAndEditingArtistDocumentForm({
    setArtists,
    closeAddSongModal,
    documentToDoAction,
    contactEmailIsActif,
    songActionIsLoading,
    setDocumentToDoAction,
    setSongActionIsLoading,
    setContactEmailIsActif,
    updatingSongFormIsActive,
    contactPhoneNumberIsActif,
    setContactPhoneNumberIsActif,
    creationAndEditingArtistDocumentFormState
}){

    const ARTIST_ROLES = [
        { value: "singer", text: "Chanteur" },
        { value: "songwriter", text: "Auteur" },
        { value: "composer", text: "Compositeur" },
    ]

    const rolesSelectRef = useRef(null)
    const rolesTomSelectRef = useRef(null)

    const { register, handleSubmit, reset, watch, setValue, formState: { isDirty } } = useForm()

    const watchAll = watch()

    const [localFile, setLocalFile] = useState(null)
    const [createArtistDocumentIsLoading, setCreateArtistDocumentIsLoading] = useState(false)

    const isModified = isDirty || localFile

    useEffect(()=>{

        if(!rolesSelectRef.current) return;

        rolesTomSelectRef.current = new TomSelect(
            rolesSelectRef.current,
            {
                options: ARTIST_ROLES,
                create: false,
                maxItems: null,
                placeholder: "sélectionnez un ou plusieurs rôles pour l'artiste",
                plugins: {
                    remove_button: {
                        title: "Supprimer ce rôle."
                    }
                },
                onChange: (values)=>{
                    setValue("roles", values, {
                        shouldDirty: true,
                        shouldValidate: true
                    })
                }
            }
        )

        return () => {
            if(rolesTomSelectRef.current){
                rolesTomSelectRef.current.destroy()
                rolesTomSelectRef.current = null
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue])

    useEffect(()=>{

        if(updatingSongFormIsActive){

            let hostedFileValue = documentToDoAction.image ? documentToDoAction.image : ""
            if(hostedFileValue){
                hostedFileValue = (hostedFileValue.startsWith('http://') || hostedFileValue.startsWith('https://')) ? hostedFileValue : process.env.NEXT_PUBLIC_API_BASE_URL+hostedFileValue
            }

            let artistEmail = documentToDoAction.contacts.email
            let artistPhoneNumber = documentToDoAction.contacts.phoneNumber

            if(artistEmail){
                setContactEmailIsActif(true)
            }
            if(artistPhoneNumber){
                setContactPhoneNumberIsActif(true)
            }

            reset({
                name: documentToDoAction.name,
                artistName: documentToDoAction.artistName,
                roles: documentToDoAction.roles || [],
                about: documentToDoAction.about,
                address: documentToDoAction.address,
                hostedFile: hostedFileValue,
                birthDayAndPlace: documentToDoAction.birthDayAndPlace,
                email: artistEmail ? artistEmail : "",
                phoneNumber: artistPhoneNumber ? artistPhoneNumber : ""
            })

            if(rolesTomSelectRef.current){
                rolesTomSelectRef.current.clear(true)
                rolesTomSelectRef.current.setValue(documentToDoAction.roles || [], true)
            }

        }
        
    }, [documentToDoAction, reset, setContactEmailIsActif, setContactPhoneNumberIsActif, updatingSongFormIsActive])

    useEffect(()=>{

        if(!creationAndEditingArtistDocumentFormState){

            reset({
                name: "",
                artistName: "",
                roles: [],
                about: "",
                address: "",
                hostedFile: "",
                birthDayAndPlace: "",
                email: "",
                phoneNumber: "",
            })

            if(rolesTomSelectRef.current){
                rolesTomSelectRef.current.clear(true)
            }

        }

    }, [creationAndEditingArtistDocumentFormState, reset])

    const createArtistDocument = async (data) => {
        try{
    
            setCreateArtistDocumentIsLoading(true)
                
            const artistData = new FormData()
    
            // Artist contacts object creation
            if(data.phoneNumber){
                artistData.append("phoneNumber", data.phoneNumber)
            }
            if(data.email){
                artistData.append("email", data.email)
            }
                
            // Artist document object création
            artistData.append('name', data.name)
            artistData.append('artistName', data.artistName)
            artistData.append('roles', JSON.stringify(data.roles))
            artistData.append('about', data.about)
            artistData.append('address', data.address)
            artistData.append('birthDayAndPlace', data.birthDayAndPlace)
            if(data.hostedFile){
                artistData.append('image', data.hostedFile)
            }
            if(localFile){
                artistData.append('artistProfile', localFile)
            }
            const response = await api.post('/artist/create-document', artistData)
                
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
            toast.error(`Erreur du création de document artiste, veuillez réessayer plus tard.`)
        }finally{
            setCreateArtistDocumentIsLoading(false)
        }
    }

    const updateArtistDocument = async (data) => {
        try{
            setSongActionIsLoading(true)
            const clearedFields = new Array()
    
            const updateAristDocumentFormData = new FormData()

            updateAristDocumentFormData.append("docId", documentToDoAction._id)
            
            if(documentToDoAction.name !== data.name){
                if(data.name === ""){
                    clearedFields.push({ UIText: "Nom", CodeText: "Name" })
                }else{
                    updateAristDocumentFormData.append('name', data.name)
                }
            }
            if(documentToDoAction.artistName !== data.artistName){
                updateAristDocumentFormData.append('artistName', data.artistName)
            }
            if(documentToDoAction.about !== data.about){
                if(data.about === ""){
                    clearedFields.push({UIText: "A propos", CodeText: "about"})
                }else{
                    updateAristDocumentFormData.append('about', data.about)
                }
            }
            if(documentToDoAction.address !== data.address){
                if(data.address === ""){
                    clearedFields.push({UIText: "Adresse", CodeText: "address"})
                }else{
                    updateAristDocumentFormData.append('address', data.address)
                }
            }
            if(documentToDoAction.birthDayAndPlace !== data.birthDayAndPlace){
                if(data.birthDayAndPlace === ""){
                    clearedFields.push({UIText: "Date et lieu de naissance", CodeText: "birthDayAndPlace"})
                }else{
                    updateAristDocumentFormData.append('birthDayAndPlace', data.birthDayAndPlace)
                }
            }

            const phoneNumber = documentToDoAction.contacts.phoneNumber ? documentToDoAction.contacts.phoneNumber : ''
            if(phoneNumber !== data.phoneNumber){
                if(data.phoneNumber === ""){
                    clearedFields.push({UIText: "Numéro téléphone", CodeText: "phoneNumber"})
                }else{
                    updateAristDocumentFormData.append('phoneNumber', data.phoneNumber)
                }
            }
            
            const email = documentToDoAction.contacts.email ? documentToDoAction.contacts.email : ''
            if(email !== data.email){
                if(data.email === ""){
                    clearedFields.push({UIText: "Adresse email", CodeText: "email"})
                }else{
                    updateAristDocumentFormData.append('email', data.email)
                }
            }

            const oldRoles = [ ...(documentToDoAction.roles || []) ].sort()
            const newRoles = [ ...(data.roles || []) ].sort()
            const rolesChanged = oldRoles.length !== newRoles.length || oldRoles.some((role, index)=> role !== newRoles[index])
            if(rolesChanged){
                updateAristDocumentFormData.append("roles", JSON.stringify(data.roles) || [])
            }
            
            const localFileUrl = documentToDoAction.image ? documentToDoAction.image : ''
            let formatedLocalFileUrl = ''

            if(localFileUrl){
                formatedLocalFileUrl = (
                    localFileUrl.startsWith('https://') ||
                    localFileUrl.startsWith('http://')
                ) ? localFileUrl : process.env.NEXT_PUBLIC_API_BASE_URL+localFileUrl
            }

            if(formatedLocalFileUrl !== data.hostedFile || localFile){

                if(formatedLocalFileUrl !== data.hostedFile){
                    if(data.hostedFile === "" && !localFile){
                        clearedFields.push({ UIText: "Photo", CodeText: "image" })
                    }else if(data.hostedFile){
                        updateAristDocumentFormData.append("image", data.hostedFile)
                    }
                }

                if(localFile){
                    updateAristDocumentFormData.append("artistProfile", localFile)
                }

            }
            
            const clearedFieldsUIText = clearedFields.map((cf)=>cf.UIText)
            
            let confirmResult = true
            
            if(clearedFieldsUIText.length > 0){
                confirmResult = window.confirm(`Etes-vous sûre de vouloir rendre vide la valeur des champs de saisie suivantes : ${JoinArrayItems(clearedFieldsUIText)} ?`)
            }

            if(confirmResult && (isDirty || localFile)){

                if(clearedFields.length > 0){
                    clearedFields.forEach((cf) => {
                        updateAristDocumentFormData.append(cf.CodeText, '')
                    })
                }

                const response = await api.patch('/artist/update', updateAristDocumentFormData)

                if(response.status === 200){
                    toast.info(`Le document artiste de ${documentToDoAction?.artistName} a été bien modifié.`)
                    api.get('/artist/get')
                        .then((response)=>{
                            setArtists(response.data)
                        })
                        .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des documents artiste."))
                }

            }

        }catch{
            toast.error("Erreur de modification du document, veuillez réessayer plus tard.")
        }finally{
            setSongActionIsLoading(false)
            closeAddSongModal()
            setDocumentToDoAction(null)
            reset()
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

    const handleFileChange = (e) => {

        const file = e.target.files[0]

        if(!file){
            return
        }

        setLocalFile(file)

        setValue("hostedFile", "", { shouldDirty: true })
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
            <span className="close-modal" onClick={closeAddSongModal}>
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
                        <select id="roles" ref={rolesSelectRef} multiple required />
                        <input type="hidden" { ...register("roles", {
                            required: true,
                            validate: value => value.length > 0 || "Veuillez sélectionner au moins un rôle."
                        }) } />
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
                        <input
                            disabled={!!localFile}
                            type="text"
                            id="hostedFile"
                            placeholder="utilisez cet champ pour une photo déjà mis en ligne"
                            {...register('hostedFile', {
                                onChange: (e) => {
                                    if(e.target.value){
                                        setLocalFile(null)
                                    }
                                }
                            })}
                        />
                        <input
                            disabled={!!watchAll.hostedFile}
                            type="file"
                            onChange={handleFileChange}
                        />
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