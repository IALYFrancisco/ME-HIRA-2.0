/* eslint-disable react/no-unescaped-entities */
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

        // reset({
        //     name: document.name,
        //     artistName: document.artistName,
        //     roles: JoinArrayItems(document.roles),
        //     about: document.about,
        //     address: document.address,
        //     hostedFile: hostedFileValue,
        //     birthDayAndPlace: document.birthDayAndPlace,
        //     email: artistEmail ? artistEmail : "",
        //     phoneNumber: artistPhoneNumber ? artistPhoneNumber : ""
        // })
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
            <CreationAndEditingArtistDocumentForm
                updatingSongFormIsActive={updatingSongFormIsActive}
                closeAddSongModal={closeAddSongModal}
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