/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { toast } from "sonner"
import SongsListSkeleton from "@/components/skeleton-loaders/songsListSkeleton"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { RefreshToken } from "@/helpers/authentication"
import { FormatSongSinger } from "@/helpers/song"

export default function SongsList(){

    var [ songs, setSongs ] = useState([])
    var [fetchSongsLoading, setfetchSongsLoading] = useState(false)
    var [addSongIsLoading, setAddSongIsLoading] = useState(false)
    const { register, handleSubmit, watch, reset } = useForm()
    const { loading } = useAuth()
    
    const watchAll = watch()
    var [localFile, setLocalFile] = useState('')
    var [localFileIsDefined, setLocalFileIsDefined] = useState(false)
    var [hostedFileIsDefined, setHostedFileIsDefined] = useState(false)
    const addSongOverlayRef = useRef(null)
    const addSongFormRef = useRef(null)

    const addSong = async (data) => {
        try{
            setAddSongIsLoading(true)
            const song = new FormData()
            song.append('title', data.title)
            song.append('author', data.author)
            song.append('album', data.album)
            song.append('composer', data.composer)
            song.append('fileType', data.fileType)
            song.append('singer', data.singer)
            if(data.hostedFile){
                song.append('fileUrl', data.hostedFile)
            }
            if(localFile){
                song.append('file', localFile)
            }
            const response = await api.post('/song/add', song, { headers: localFileIsDefined ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"} })
            if(response.status === 209) RefreshToken(
                api.post('/song/add', song, { headers: localFileIsDefined ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/json"} })
                .then(()=>{
                    toast.info(`La chanson intitulée ${data.title} a été ajoutée dans le base de donnée.`)
                    reset()
                    closeAddSongModal()
                })
            );
            if(response.status === 201){
                toast.info(`La chanson intitulée ${data.title} a été ajoutée dans le base de donnée.`)
                reset()
                closeAddSongModal()
            }
        }catch{
            toast.error(`Erreur de l'ajout du chanson, veuillez réessayer plus tard.`)
        }finally{
            setAddSongIsLoading(false)
        }
    }

    const openAddSongModal = ()=>{
        addSongOverlayRef.current.classList.add('active')
        addSongFormRef.current.classList.add('active')
    }

    const closeAddSongModal = ()=>{
        addSongOverlayRef.current.classList.remove('active')
        addSongFormRef.current.classList.remove('active')
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
        setfetchSongsLoading(true)
        api.get('/song/get')
        .then((response) => setSongs(response.data))
        .catch(()=>setSongs([]))
        .finally(()=>setfetchSongsLoading(false))
    }, [])

    return(
        <>
            <section className="dashboard-songs-container">
                <div className="page-header-container">
                    <section className="header">
                        <div className="page-title">
                            <Link href="/">
                                <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                            </Link>
                            <h1>Chansons</h1>
                        </div>
                        <div className="actions-container">
                            <div className="filters-container">
                                <input type="text" name="" id="" placeholder="Rechercher des chansons ..." />
                            </div>
                            <span>
                                <button onClick={openAddSongModal}>
                                    <Image src="/images/plus.png" priority height={16} width={16} alt="ajout de chanson"/>
                                    Ajouter une chanson
                                </button>
                            </span>
                        </div>
                        <div className="custom">
                        </div>
                    </section>
                </div>
                <section className="body">
                    <table>
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Chanteur</th>
                                <th>Auteur</th>
                                <th>Compositeur</th>
                                <th>Publiée ?</th>
                                <th className="actions">Actions</th>
                            </tr>
                        </thead>
                        { ( loading || fetchSongsLoading) && <SongsListSkeleton/> }
                        { !loading && !fetchSongsLoading && songs &&
                            <tbody>
                                { songs.map(song=>(
                                    <tr key={song._id}>
                                        <td>{song.title}</td>
                                        <td>{FormatSongSinger(song.singer)}</td>
                                        <td>{song.author ? song.author : "------------"}</td>
                                        <td>{song.composer ? song.composer : "------------"}</td>
                                        <td>
                                            <span className={song.published ? "song-badge yes" : "song-badge no"}>{song.published ? "Oui" : "Non"}</span>
                                        </td>
                                        <td className="actions">
                                            <Image src="/images/song-menu-actions.png" width={16} height={16} priority alt="menu des actions sur chaque chanson"/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                </section>
            </section>
            <div className="add-song-overlay" ref={addSongOverlayRef} onClick={closeAddSongModal}></div>
            <form onSubmit={handleSubmit(addSong)} className="add-song-modal" ref={addSongFormRef}>
                <span className="close-modal" onClick={ ()=> {closeAddSongModal(); reset()}}>
                    <Image src="/images/close.png" width={16} height={16} priority alt="fermer modal d'ajout de chanson"/>
                </span>
                <h2>Ajout d'une chanson :</h2>
                <section>
                    <fieldset>
                            <legend><h3>A propos du chanson :</h3></legend>
                            <div className="form-element">
                                <label htmlFor="title">Titre :</label>
                                <input type="text" placeholder="titre du chanson" id="title" { ...register('title', {required: true}) } required />
                            </div>
                            <div className="form-element">
                                <label htmlFor="singer">Chanteur (veuillez séparer par un virgule chaque chanteur) :</label>
                                <input type="text" placeholder="ex: chanteur1, chanteur2, chanteur3, ..." id="singer" { ...register('singer', {required: true}) } required />
                            </div>
                            <div className="form-element">
                                <label htmlFor="author">Auteur :</label>
                                <input type="text" placeholder="auteur du chanson" id="author" { ...register('author', {required: true}) } required/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="composer">Compositeur :</label>
                                <input type="text" placeholder="compositeur du chanson" id="composer" {...register('composer', {required:true})} required/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="album">Album :</label>
                                <input type="text" placeholder="l'album auquel appartien la chanson" id="album" {...register('album',{required:true})} required/>
                            </div>
                    </fieldset>
                    <fieldset>
                        <legend><h3>A propos du fichier :</h3></legend>
                        <div className="form-element">
                            <label htmlFor="hostedFile">Fichier :</label>
                            <input disabled={localFileIsDefined} type="text" id="hostedFile" placeholder="utilisez cet champ pour un fichier déjà mis en ligne" {...register('hostedFile', {required:!localFileIsDefined})} required />
                            <input disabled={hostedFileIsDefined} type="file" onChange={(e)=>setLocalFile(e.target.files[0])} required />
                        </div>
                        <div className="form-element">
                            <label htmlFor="fileType">Type du fichier :</label>
                            <select id="fileType" {...register('fileType', { required: true })} required>
                                <option value="">------</option>
                                <option value="audio">Audio</option>
                                <option value="video">Vidéo</option>
                            </select>
                        </div>
                    </fieldset>
                </section>
                <div className="form-element">
                    <span className={addSongIsLoading?"border disabled":"border"}>
                        <button disabled={addSongIsLoading}>
                            {addSongIsLoading ? <Image src="/images/black-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> : "Soumettre"}
                        </button>
                    </span>
                </div>
            </form>
        </>
    )
}