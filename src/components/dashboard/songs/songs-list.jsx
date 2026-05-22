/* eslint-disable react/no-unescaped-entities */
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function SongsList(){

    var [ songs, setSongs ] = useState([])

    const { register, handleSubmit } = useForm()

    const addSong = () => {}

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
                            <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                            <h1>Chansons</h1>
                        </div>
                        <div className="actions-container">
                            <div className="filters-container">
                                <input type="text" name="" id="" placeholder="Rechercher des chansons ..." />
                            </div>
                            <span>
                                <button>Ajouter une chanson</button>
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
            <div className="add-song-overlay active"></div>
            <form onSubmit={handleSubmit(addSong)} className="add-song-modal active">
                <h2>Ajout d'une chanson :</h2>
                <section>
                    <fieldset>
                            <legend><h3>A propos du chanson :</h3></legend>
                            <div className="form-element">
                                <label htmlFor="title">Titre :</label>
                                <input type="text" id="title" { ...register('title', {required: true}) } required />
                            </div>
                            <div className="form-element">
                                <label htmlFor="singer">Chanteur (veuillez séparer par un virgule chaque chanteur) :</label>
                                <input type="text" id="singer" { ...register('singer', {required: true}) } required />
                            </div>
                            <div className="form-element">
                                <label htmlFor="author">Auteur :</label>
                                <input type="text" id="author" { ...register('author', {required: true}) } required/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="composer">Compositeur :</label>
                                <input type="text" id="composer" {...register('composer', {required:true})} required/>
                            </div>
                            <div className="form-element">
                                <label htmlFor="album">Album :</label>
                                <input type="text" id="album" {...register('album',{required:true})} required/>
                            </div>
                    </fieldset>
                    <fieldset>
                        <legend><h3>A propos du fichier :</h3></legend>
                        <div className="form-element">
                            <label htmlFor="file">Fichier :</label>
                            <input type="text" id="file" {...register('file', {required:true})} required />
                            <input type="file" {...register('file',{required:true})} required />
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