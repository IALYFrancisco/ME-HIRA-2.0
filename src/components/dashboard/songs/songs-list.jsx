/* eslint-disable react/no-unescaped-entities */
import axios from "axios"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"

export default function SongsList(){

    var [ songs, setSongs ] = useState([])
    const { register, handleSubmit, watch } = useForm()
    
    const watchAll = watch()
    var [localFile, setLocalFile] = useState('')
    var [localFileIsDefined, setLocalFileIsDefined] = useState(false)
    var [hostedFileIsDefined, setHostedFileIsDefined] = useState(false)
    const addSongOverlayRef = useRef(null)
    const addSongFormRef = useRef(null)

    const addSong = async (data) => {

        console.log(data)

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

        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/add`, song)

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
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get`)
        .then((response) => setSongs(response.data))
        .catch(()=>setSongs([]))
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
                                <button onClick={openAddSongModal}>Ajouter une chanson</button>
                            </span>
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
                        { songs &&
                            <tbody>
                                { songs.map(song=>(
                                    <tr key={song._id}>
                                        <td>{song.title}</td>
                                        <td>{song.singer}</td>
                                        <td>{song.author ? song.author : "------------"}</td>
                                        <td>{song.composer ? song.composer : "------------"}</td>
                                        <td>
                                            <span className={song.published ? "song-badge yes" : "song-badge no"}>{song.published ? "Oui" : "Non"}</span>
                                        </td>
                                        <td className="actions">Actions</td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                </section>
            </section>
            <div className="add-song-overlay" ref={addSongOverlayRef} onClick={closeAddSongModal}></div>
            <form onSubmit={handleSubmit(addSong)} className="add-song-modal" ref={addSongFormRef}>
                <span className="close-modal" onClick={closeAddSongModal}></span>
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
                            <input disabled={localFileIsDefined} type="text" id="hostedFile" placeholder="utilisez cet champ pour un fichier déjà mis en ligne" {...register('hostedFile', {required:true})} required />
                            <input disabled={hostedFileIsDefined} type="file" onChange={(e)=>setLocalFile(e.target.value)} required />
                        </div>
                        <div className="form-element">
                            <label htmlFor="fileType">Type du fichier :</label>
                            <select id="fileType" required>
                                <option value="">------</option>
                                <option value="audio">Audio</option>
                                <option value="video">Vidéo</option>
                            </select>
                        </div>
                    </fieldset>
                </section>
                <div className="form-element">
                    <span className="border">
                        <button>Soumettre</button>
                    </span>
                </div>
            </form>
        </>
    )
}