/* eslint-disable react-hooks/exhaustive-deps */
import { api } from "@/helpers/api"
import { FormatSongSinger } from "@/helpers/song"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

export default function Navbar (){

    const { watch } = useForm()
    const watchAll = watch()
    var [prompt, setPrompt] = useState("")
    var [results, setResults] = useState([])
    var [searchIsLoading, setSearchIsLoading] = useState(false)
    var [ filterTypePopUpIsActive, setFilterTypePopUpIsActive] = useState(false)

    const searchSongs = async (p) => api.get(`/song/get?prompt=${p}`)

    const fetchSongs = async (value)=>{
        try {
            setSearchIsLoading(true)
            const response = await searchSongs(value)
            let _song = response.data?.filter(s=>s.published===true)
            setResults(_song)
        }
        finally{
            setSearchIsLoading(false)
        }
    }

    useEffect(()=>{
        if(prompt === ""){
            setResults([])
        }
        if(prompt && prompt.trim() !== ""){
            fetchSongs(prompt)
        }
    },[prompt])

    const toggleFilterTypePopUp = () => {
        filterTypePopUpIsActive ? setFilterTypePopUpIsActive(false) : setFilterTypePopUpIsActive(true)
    }

    const openFilterTypePopUp = () => {
        setFilterTypePopUpIsActive(true)
    }

    const closeFilterTypePopUp = () => {
        setFilterTypePopUpIsActive(false)
    }

    return(
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                    </Link>
                </li>
                <li>
                    <span className="searchbar-container">
                        <input type="text" id="songSearch" placeholder="Rechercher des chansons ..." value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}/>
                        <div className={((prompt && results.length > 0)) ? "home-search-modal active" : "home-search-modal"}>
                            <ul>
                                { results.map((song)=>(
                                    <li key={song._id}>
                                        <Link href={`/song/${song.slug}`}>
                                            <h4>{song.title}</h4>
                                            <span className="singer-container">
                                                <h5>{FormatSongSinger(song.singer)}</h5>
                                                <span className="badge">{song.fileType}</span>
                                            </span>
                                        </Link>
                                    </li>
                                )) }
                            </ul>
                        </div>
                        <button>
                            {/* <Image src="/images/search.png" priority alt="recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="search-icone" /> */}
                            <Image src="/images/spinner (1).svg" priority alt="recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="search-icone" />
                        </button>
                    </span>
                    <div className="filter-type-container">
                        <button className="filter" onClick={toggleFilterTypePopUp}>
                            <Image src="/images/filter.png" priority alt="filtre des chansons de me-hira" width={48} height={48} className="filter-icone" />
                        </button>
                        <div className={ filterTypePopUpIsActive ? "filter-type-popup active" : "filter-type-popup" }>
                            <label htmlFor="fileType">Type de fichier :</label>
                            <select name="fileType" id="fileType">
                                <option value="">Tout type de fichier</option>
                                <option value="video">Vidéos</option>
                                <option value="audio">Audios</option>
                            </select>
                        </div>
                    </div>
                </li>
                <li>
                    <Link href="/authentication/login">
                        <button>Se connecter</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}