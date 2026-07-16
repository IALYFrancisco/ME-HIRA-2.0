/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { toast } from "sonner"
import SongsListSkeleton from "@/components/skeleton-loaders/songsListSkeleton"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { JoinArrayItems } from "@/helpers/song"
import { formToJSON } from "axios"
import Overlay from "@/components/overlay"
import RemoveArtistDocumentModal from "./removeArtistDocumentModal"
import CreationAndEditingArtistDocumentForm from "./creationAndEditingArtistDocumentForm"

export default function ArtistsList(){

    var [ contactPhoneNumberIsActif, setContactPhoneNumberIsActif ] = useState(false)
    var [ contactEmailIsActif, setContactEmailIsActif ] = useState(false)
    const [ overlayState, setOverlayState ] = useState(false)
    const [ removeArtistDocumentModalState, setRemoveArtistDocumentModalState ] = useState(false)
    const [ creationAndEditingArtistDocumentFormState, setCreationAndEditingArtistDocumentFormState] = useState(false)
    
    var [ artists, setArtists ] = useState([])
    var [fetchArtistIsLoading, setfetchArtistsIsLoading] = useState(false)
    var [createArtistDocumentIsLoading, setCreateArtistDocumentIsLoading] = useState(false)
    const { watch, reset } = useForm()
    const { loading } = useAuth()
    
    // const watchAll = watch()
    // var [localFile, setLocalFile] = useState('')
    // var [localFileIsDefined, setLocalFileIsDefined] = useState(false)
    // var [hostedFileIsDefined, setHostedFileIsDefined] = useState(false)
    // const addSongFormRef = useRef(null)
    var [ activePopUp, setActivePopUp ] = useState(null)
    const popUpActionsRef = useRef(null)
    const [ documentToDoAction, setDocumentToDoAction ] = useState(null)
    const [ songActionIsLoading, setSongActionIsLoading ] = useState(false)
    const [ updatingSongFormIsActive, setUpdatingSongFormIsActive ] = useState(false)

    var [ prompt, setPrompt ] = useState("")

    const toggleOverlayState = () => {
        if(overlayState){
            setOverlayState(false)
        }else{
            setOverlayState(true)
        }
    }

    const toggleRemoveArtistDocumentModalState = ()=>{
        if(removeArtistDocumentModalState){
            setRemoveArtistDocumentModalState(false)
        }else{
            setRemoveArtistDocumentModalState(true)
        }
    }

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(popUpActionsRef.current && !popUpActionsRef.current.contains(event.target)){
                setActivePopUp(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const searchArtists = async (p) => api.get(`/artist/get?prompt=${p}`)

    const fetchArtists = async (value)=>{
        const response = await searchArtists(value)
        setArtists(response.data)
    }

    useEffect(()=>{
        fetchArtists(prompt)
    },[prompt])

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

    const toggleActionsPopUp = (songId) => {
        setActivePopUp((prev)=>(prev === songId ? null : songId))
    }

    // const createArtistDocument = async (data) => {
    //     try{

    //         setCreateArtistDocumentIsLoading(true)
            
    //         const artistDocument = new FormData()
    //         const artistContact = new FormData()

    //         // Artist contacts object creation
    //         if(data.phoneNumber){
    //             artistContact.append("phoneNumber", data.phoneNumber)
    //         }
    //         if(data.email){
    //             artistContact.append("email", data.email)
    //         }
            
    //         // Artist document object création
    //         artistDocument.append('name', data.name)
    //         artistDocument.append('artistName', data.artistName)
    //         artistDocument.append('roles', data.roles)
    //         artistDocument.append('about', data.about)
    //         artistDocument.append('address', data.address)
    //         artistDocument.append('birthDayAndPlace', data.birthDayAndPlace)
    //         if(data.hostedFile){
    //             artistDocument.append('image', data.hostedFile)
    //         }
    //         if(localFile){
    //             artistDocument.append('file', localFile)
    //         }
    //         const response = await api.post(
    //             '/artist/create-document',
    //             { 
    //                 artist: formToJSON(artistDocument),
    //                 contact: formToJSON(artistContact)
    //             },
    //             {
    //                 headers: localFileIsDefined ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"}
    //             })
            
    //         if(response.status === 201){
    //             api.get('/artist/get')
    //                 .then((response) => {
    //                     setArtists(response.data)
    //                 })
    //                 .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des documents artiste."))
    //             toast.info(`Le document artiste de ${data.artistName} est créé dans la base de donnée.`)
    //             reset()
    //             setLocalFile(null)
    //             closeAddSongModal()
    //         }
    //     }catch{
    //         toast.error(`Erreur de l'ajout du chanson, veuillez réessayer plus tard.`)
    //     }finally{
    //         setCreateArtistDocumentIsLoading(false)
    //     }
    // }

    const openAddSongModal = ()=>{
        toggleOverlayState()
        // addSongFormRef.current.classList.add('active')
    }

    const closeAddSongModal = ()=>{
        toggleOverlayState()
        // addSongFormRef.current.classList.remove('active')
        setRemoveArtistDocumentModalState(false)
        reset({
            name: "",
            artistName: "",
            roles: "",
            about: "",
            address: "",
            hostedFile: "",
            birthDayAndPlace: "",
            email: "",
            phoneNumber: "",
        })
        setContactEmailIsActif(false)
        setContactPhoneNumberIsActif(false)
        setUpdatingSongFormIsActive(false)
    }

    useEffect(()=>{
        setfetchArtistsIsLoading(true)
        api.get('/artist/get')
        .then((response) => setArtists(response.data))
        .catch(()=>setArtists([]))
        .finally(()=>setfetchArtistsIsLoading(false))
    }, [])

    const handleClickNoButton = () => {
        toggleRemoveArtistDocumentModalState()
        toggleOverlayState()
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0]

        if(!file){
            return
        }

        const allowedTypes = [
            "audio/mpeg",
            "audio/mp3",
            "audio/wav",
            "audio/ogg",
            "audio/x-wav",
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/x-msvideo",
            "video/quicktime"
        ]

        if(!allowedTypes.includes(file.type)){
            toast.error("Seuls les fichiers audio et vidéo sont autorisés.")
            e.target.value = ""
            return
        }

        setLocalFile(file)
    }

    const openSongRemoveModal = (document)=>{
        setDocumentToDoAction(document)
        toggleOverlayState()
        toggleRemoveArtistDocumentModalState()
    }

    const removeDocumentArtist = async (artist) => {
        try{
            setSongActionIsLoading(true)
            let response = await api.delete('/artist/delete', { data: { docId: artist._id } })
            if(response.status === 200){
                toast.info(`Le document artiste de ${artist?.artistName} a été supprimé.`)
                api.get('/artist/get')
                    .then((response) => {
                        setArtists(response.data)
                    })
                    .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des documents artiste."))
            }
        }catch{
            toast.error("Erreur de suppression du document artiste, veuillez réessayer plus tard.")
        }finally{
            setSongActionIsLoading(false)
            toggleRemoveArtistDocumentModalState()
            toggleOverlayState()
        }
    }

    // const isModified = isDirty || localFile

    // const updateArtistDocument = async (data) => {
    //     try{
    //         setSongActionIsLoading(true)

    //         const artist = new FormData()
    //         const artistContact = new FormData()

    //         if(documentToDoAction.name !== data.name){
    //             artist.append('name', data.name)
    //         }
    //         if(documentToDoAction.artistName !== data.artistName){
    //             artist.append('artistName', data.artistName)
    //         }
    //         if(documentToDoAction.about !== data.about){
    //             artist.append('about', data.about)
    //         }
    //         if(documentToDoAction.address !== data.address){
    //             artist.append('address', data.address)
    //         }
    //         if(documentToDoAction.birthDayAndPlace !== data.birthDayAndPlace){
    //             artist.append('birthDayAndPlace', data.birthDayAndPlace)
    //         }
    //         if(documentToDoAction.contacts.phoneNumber !== data.phoneNumber){
    //             artistContact.append('phoneNumber', data.phoneNumber)
    //         }
    //         if(documentToDoAction.contacts.email !== data.email){
    //             artistContact.append('email', data.email)
    //         }
    //         if(JoinArrayItems(documentToDoAction.roles) !== data.roles){
    //             artist.append('roles', data.roles)
    //         }
    //         let localFileUrl = (
    //             documentToDoAction.image?.startsWith('https://') ||
    //             documentToDoAction.image?.startsWith('http://')
    //         ) ? documentToDoAction.image : process.env.NEXT_PUBLIC_API_BASE_URL+documentToDoAction.image

    //         if(
    //             (localFileUrl !== data.hostedFile)
    //             ||(localFile)
    //         ){    
    //             if(localFileUrl !== data.hostedFile){
    //                 artist.append('image', data.hostedFile)
    //             }
    //             if(localFile){
    //                 artist.append('file', localFile)
    //             }
    //         }

    //         let update = {}

    //         update.docId = documentToDoAction._id
    //         if(Object.keys((formToJSON(artist))).length !== 0){
    //             update.artist = formToJSON(artist)
    //         }
    //         if(Object.keys(formToJSON(artistContact)).length !== 0){
    //             update.artistContact = formToJSON(artistContact)
    //         }

    //         let response = await api.patch('/artist/update', { update })
    //         if(response.status === 200){
    //             toast.info(`Le document artiste de ${documentToDoAction?.artistName} a été bien modifié.`)
    //             api.get('/artist/get')
    //                 .then((response) => {
    //                     setArtists(response.data)
    //                 })
    //                 .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des documents artiste."))
    //         }
    //     }catch{
    //         toast.error("Erreur de modification du document, veuillez réessayer plus tard.")
    //     }finally{
    //         setSongActionIsLoading(false)
    //         closeAddSongModal()
    //         setDocumentToDoAction(null)
    //         setLocalFile(null)
    //     }
    // }

    const handleUpdateDocumentActionClick = (document) => {

        let hostedFileValue = document.image ? document.image : ""
        if(hostedFileValue){
            hostedFileValue = (hostedFileValue.startsWith('http://') || hostedFileValue.startsWith('https://')) ? hostedFileValue : process.env.NEXT_PUBLIC_API_BASE_URL+hostedFileValue
        }
        
        setUpdatingSongFormIsActive(true)
        openAddSongModal()
        setDocumentToDoAction(document)

        let artistEmail = document.contacts.email
        let artistPhoneNumber = document.contacts.phoneNumber

        if(artistEmail){
            setContactEmailIsActif(true)
        }
        if(artistPhoneNumber){
            setContactPhoneNumberIsActif(true)
        }

        reset({
            name: document.name,
            artistName: document.artistName,
            roles: JoinArrayItems(document.roles),
            about: document.about,
            address: document.address,
            hostedFile: hostedFileValue,
            birthDayAndPlace: document.birthDayAndPlace,
            email: artistEmail ? artistEmail : "",
            phoneNumber: artistPhoneNumber ? artistPhoneNumber : ""
        })
    }

    return(
        <>
            <section className="dashboard-songs-container">
                <div className="page-header-container">
                    <section className="header">
                        <div className="page-title">
                            <Link href="/">
                                <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                            </Link>
                            <h1>Artistes</h1>
                        </div>
                        <div className="actions-container">
                            <div className="filters-container">
                                <input type="text" name="" id="" placeholder="Rechercher des artistes ..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
                            </div>
                            <span>
                                <button onClick={openAddSongModal}>
                                    <Image src="/images/plus.png" priority height={16} width={16} alt="ajout de chanson"/>
                                    Créer un document artiste 
                                </button>
                            </span>
                        </div>
                        <div className="empty-container">
                        </div>
                    </section>
                </div>
                <section className="body">
                    <table>
                        <thead>
                            <tr>
                                <th>Nom complet</th>
                                <th>Nom d'artiste</th>
                                <th>Rôles</th>
                                <th>Adresse</th>
                                <th>Date et lieu de naissance</th>
                                <th className="actions">Actions</th>
                            </tr>
                        </thead>
                        { ( loading || fetchArtistIsLoading) && <SongsListSkeleton/> }
                        { !loading && !fetchArtistIsLoading && artists &&
                            <tbody>
                                { artists.map(artist=>(
                                    <tr key={artist._id}>
                                        <td>{artist.name}</td>
                                        <td>{artist.artistName}</td>
                                        <td>{JoinArrayItems(artist.roles)}</td>
                                        <td>{artist.address}</td>
                                        <td>{artist.birthDayAndPlace}</td>
                                        <td className="actions">
                                            <ul ref={ activePopUp === artist._id ? popUpActionsRef : null } className={ activePopUp === artist._id ? "song-actions active" : "song-actions" }>
                                                <li onClick={()=>handleUpdateDocumentActionClick(artist)}>Modifier</li>
                                                <li onClick={()=>openSongRemoveModal(artist)}>Supprimer</li>
                                            </ul>
                                            <Image onClick={()=>toggleActionsPopUp(artist._id)} src="/images/song-menu-actions.png" width={16} height={16} priority alt="menu des actions sur chaque chanson"/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                </section>
            </section>
            <Overlay overlayState={overlayState} onClickAction={closeAddSongModal}/>
            {/* <form onSubmit={
                handleSubmit(
                    updatingSongFormIsActive ? updateArtistDocument : createArtistDocument
                )}
                className="add-song-modal" ref={addSongFormRef}
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
            </form> */}
            <CreationAndEditingArtistDocumentForm
                updatingSongFormIsActive={updatingSongFormIsActive}
            />
            <RemoveArtistDocumentModal
                removeArtistDocumentModalState={removeArtistDocumentModalState}
                documentToDoAction={documentToDoAction}
                handleClickNoButton={handleClickNoButton}
                songActionIsLoading={songActionIsLoading}
                removeDocumentArtist={removeDocumentArtist}
            />
        </>
    )
}