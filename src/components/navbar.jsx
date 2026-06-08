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

    var searchSongModalRef = useRef(null)

    const searchSongs = async (p) => api.get(`/song/get?prompt=${p}`)

    useEffect(()=>{
        if(prompt){
            searchSongModalRef.current.classList.add('active')
        }else{
            searchSongModalRef.current.classList.remove('active')
        }
    },[prompt])


    const fetchSongs = async (value)=>{
        try {
            setSearchIsLoading(true)
            const response = await searchSongs(value)
            setResults(response.data)
        }
        finally{
            setSearchIsLoading(false)
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(prompt.length < 2){
                setResults([])
                return
            }
            fetchSongs(prompt)
        }, 300)
        return ()=>clearTimeout(timer)
    },[prompt])

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
                        <div className="home-search-modal" ref={searchSongModalRef}>
                            <ul>
                                { results.map((song)=>{
                                    <li key={song._id}>
                                        <Link href={`/song/${song.slug}`}>
                                            <h4>{song.title}</h4>
                                            <span className="singer-container">
                                                <h5>{FormatSongSinger(song.singer)}</h5>
                                                <span className="badge">{song.fileType}</span>
                                            </span>
                                        </Link>
                                    </li>
                                }) }
                            </ul>
                        </div>
                        <button>
                            <Image src="/images/search.png" priority alt="recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="search-icone" />
                        </button>
                    </span>
                    <button className="filter">
                        <Image src="/images/filter.png" priority alt="filtre des chansons de me-hira" width={48} height={48} className="filter-icone" />
                    </button>
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