/* eslint-disable react/no-unescaped-entities */
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

export default function ArtistsList(){

    var [ contactPhoneNumberIsActif, setContactPhoneNumberIsActif ] = useState(false)
    
    var [ contactEmailIsActif, setContactEmailIsActif ] = useState(false)
    
    var [ artists, setArtists ] = useState([])
    var [fetchArtistIsLoading, setfetchArtistsIsLoading] = useState(false)
    var [createArtistDocumentIsLoading, setCreateArtistDocumentIsLoading] = useState(false)
    const { register, handleSubmit, watch, reset, formState: { isDirty } } = useForm()
    const { loading } = useAuth()
    
    const watchAll = watch()
    var [localFile, setLocalFile] = useState('')
    var [localFileIsDefined, setLocalFileIsDefined] = useState(false)
    var [hostedFileIsDefined, setHostedFileIsDefined] = useState(false)
    const addSongOverlayRef = useRef(null)
    const addSongFormRef = useRef(null)
    var [ activePopUp, setActivePopUp ] = useState(null)
    const popUpActionsRef = useRef(null)
    const [ songToDoAction, setSongToDoAction ] = useState(null)
    const [ songActionIsLoading, setSongActionIsLoading ] = useState(false)
    const [ updatingSongFormIsActive, setUpdatingSongFormIsActive ] = useState(false)

    const removeSongModalRef = useRef(null)

    var [ prompt, setPrompt ] = useState("")

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

    // const searchSongs = async (p) => api.get(`/song/get?prompt=${p}`)

    // const fetchSongs = async (value)=>{
    //     const response = await searchSongs(value)
    //     setSongs(response.data)
    // }

    // useEffect(()=>{
    //     fetchSongs(prompt)
    // },[prompt])

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
                        setSongs(response.data)
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

    const openAddSongModal = ()=>{
        addSongOverlayRef.current.classList.add('active')
        addSongFormRef.current.classList.add('active')
    }

    const closeAddSongModal = ()=>{
        addSongOverlayRef.current.classList.remove('active')
        addSongFormRef.current.classList.remove('active')
        reset({
            title: "",
            singer: "",
            author: "",
            composer: "",
            album: "",
            hostedFile: "",
            fileType: ""
        })
        setUpdatingSongFormIsActive(false)
    }

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
        setfetchArtistsIsLoading(true)
        api.get('/artist/get')
        .then((response) => setArtists(response.data))
        .catch(()=>setArtists([]))
        .finally(()=>setfetchArtistsIsLoading(false))
    }, [])

    const handleClickNoButton = () => {
        if(removeSongModalRef.current){
            removeSongModalRef.current.classList.remove('active')
        }
        addSongOverlayRef.current.classList.remove('active')
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

    const openSongRemoveModal = (song)=>{
        setSongToDoAction(song)
        addSongOverlayRef.current.classList.add('active')
        removeSongModalRef.current.classList.add('active')
    }

    const removeSong = async (song) => {
        try{
            setSongActionIsLoading(true)
            let response = await api.delete('/song/remove', { data: { song: song._id } })
            if(response.status === 200){
                toast.info(`La chanson intitulée ${song?.title} a été supprimée.`)
                api.get('/song/get')
                    .then((response) => {
                        setSongs(response.data)
                    })
                    .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des chansons."))
            }
        }catch{
            toast.error("Erreur de suppression du chanson, veuillez réessayer plus tard.")
        }finally{
            setSongActionIsLoading(false)
            removeSongModalRef.current.classList.remove('active')
            addSongOverlayRef.current.classList.remove('active')
        }
    }

    const isModified = isDirty || localFile

    const updateSong = async (data) => {
        try{
            setSongActionIsLoading(true)

            const update = new FormData()

            if(songToDoAction.title !== data.title){
                update.append('title', data.title)
            }
            if(songToDoAction.author !== data.author){
                update.append('author', data.author)
            }
            if(songToDoAction.album !== data.album){
                update.append('album', data.album)
            }
            if(songToDoAction.composer !== data.composer){
                update.append('composer', data.composer)
            }
            if(songToDoAction.fileType !== data.fileType){
                update.append('fileType', data.fileType)
            }
            if(JoinArrayItems(songToDoAction.singer) !== data.singer){
                update.append('singer', data.singer)
            }
            let localFileUrl = (
                songToDoAction.fileUrl.startsWith('https://') ||
                songToDoAction.fileUrl.startsWith('http://')
            ) ? songToDoAction.fileUrl : process.env.NEXT_PUBLIC_API_BASE_URL+songToDoAction.fileUrl

            if(
                (localFileUrl !== data.hostedFile)
                ||(localFile)
            ){    
                if(localFileUrl !== data.hostedFile){
                    update.append('fileUrl', data.hostedFile)
                }
                if(localFile){
                    update.append('file', localFile)
                }
            }

            let response = await api.patch('/song/update', { song: songToDoAction._id, update: formToJSON(update)})
            if(response.status === 200){
                toast.info(`La chanson intitulée ${songToDoAction?.title} a été bien modifiée.`)
                api.get('/song/get')
                    .then((response) => {
                        setSongs(response.data)
                    })
                    .catch(()=>toast.error("Erreur de récupération de la nouvelle liste des chansons."))
            }
        }catch{
            toast.error("Erreur de modification du chanson, veuillez réessayer plus tard.")
        }finally{
            setSongActionIsLoading(false)
            closeAddSongModal()
            setSongToDoAction(null)
            setLocalFile(null)
        }
    }

    const handleUpdateSongActionClick = (song) => {
        setUpdatingSongFormIsActive(true)
        openAddSongModal()
        setSongToDoAction(song)
        reset({
            title: song.title,
            singer: JoinArrayItems(song.singer),
            author: song.author,
            composer: song.composer,
            album: song.album,
            hostedFile: (
                song.fileUrl.startsWith('http://') ||
                song.fileUrl.startsWith('https://')
            ) ? song.fileUrl : process.env.NEXT_PUBLIC_API_BASE_URL+song.fileUrl,
            fileType: song.fileType
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
                                                <li onClick={()=>handleUpdateSongActionClick(artist)}>Modifier</li>
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
            <div className="add-song-overlay" ref={addSongOverlayRef} onClick={closeAddSongModal}></div>
            <form onSubmit={
                handleSubmit(
                    updatingSongFormIsActive ? updateSong : createArtistDocument
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
                                    <Image src="/images/artist.png" width={20} height={20} alt="email input" priority/>
                                </li>
                                <li onClick={toggleContactEmail} className={ contactEmailIsActif ? "actif" : "" } title="Adresse email">
                                    <Image src="/images/artist.png" width={20} height={20} alt="email input" priority/>
                                </li>
                            </ul>
                            <div className="inputs-container">
                                { 
                                    contactPhoneNumberIsActif &&
                                    <div className="input-container">
                                        <span></span>
                                        <input type="tel" id="numberPhone" placeholder="numéro téléphone de l'artiste" title="Numéro téléphone" { ...register("phoneNumber") }/>
                                    </div>
                                }
                                { 
                                    contactEmailIsActif && 
                                    <div className="input-container">
                                        <span></span>
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
            <div ref={removeSongModalRef} className="remove-song-modal">
                <h3>Suppression d'une chanson.</h3>
                { songToDoAction &&
                    <p>
                        Êtes-vous sûr(e) de vouloir supprimer la chanson intitulée
                        <strong> {songToDoAction.title} </strong>
                        chantée par
                        <strong> {JoinArrayItems(songToDoAction.singer)} </strong>
                        ?
                    </p>
                }
                <div className="remove-song-choices">
                    <span onClick={handleClickNoButton}><button disabled={songActionIsLoading} className="no">Non</button></span>
                    <span>
                        <button disabled={songActionIsLoading} onClick={()=>removeSong(songToDoAction)} className="yes">
                            { 
                                songActionIsLoading ?
                                <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                                : "Oui"
                            }
                        </button>
                    </span>
                </div>
            </div>
        </>
    )
}