import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function SongsList(){

    var [ songs, setSongs ] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get`)
        .then((response) => setSongs(response.data))
        .catch(()=>setSongs([]))
    }, [])

    return(
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
                                <>
                                    <tr>
                                        <td>{song.title}</td>
                                        <td>{song.singer}</td>
                                        <td>{song.author}</td>
                                        <td>{song.composer}</td>
                                        <td>
                                            <span className="song-badge yes">Oui</span>
                                        </td>
                                        <td className="actions">Actions</td>
                                    </tr>
                                </>
                            ))
                            }
                            { songs.map(song=>(
                                <>
                                    <tr>
                                        <td>{song.title}</td>
                                        <td>{song.singer}</td>
                                        <td>{song.author}</td>
                                        <td>{song.composer}</td>
                                        <td>
                                            <span className="song-badge yes">Oui</span>
                                        </td>
                                        <td className="actions">Actions</td>
                                    </tr>
                                </>
                            ))
                            }
                        </tbody>
                    }
                </table>
            </section>
        </section>
    )
}