import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

export default function Navbar (){

    const { register, watch } = useForm()

    const watchAll = watch()

    var searchSongModalRef = useRef(null)

    useEffect(()=>{
        if(watchAll.songSearch){
            searchSongModalRef.current.classList.add('active')
        }else{
            searchSongModalRef.current.classList.remove('active')
        }
    },[watchAll])

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
                        <input type="text" id="songSearch" placeholder="Rechercher des chansons ..." {...register('songSearch')}/>
                        <div className="home-search-modal" ref={searchSongModalRef}>
                            <ul>
                                <li>
                                    <Link href="">
                                        <h4>Titre du chanson</h4>
                                        <span className="singer-container">
                                            <h5>Cahnteur du chanson</h5>
                                            <span className="badge">vidéo</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <h4>Titre du chanson</h4>
                                        <span className="singer-container">
                                            <h5>Cahnteur du chanson</h5>
                                            <span className="badge">vidéo</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <h4>Titre du chanson</h4>
                                        <span className="singer-container">
                                            <h5>Cahnteur du chanson</h5>
                                            <span className="badge">vidéo</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <h4>Titre du chanson</h4>
                                        <span className="singer-container">
                                            <h5>Cahnteur du chanson</h5>
                                            <span className="badge">vidéo</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <h4>Titre du chanson</h4>
                                        <span className="singer-container">
                                            <h5>Cahnteur du chanson</h5>
                                            <span className="badge">vidéo</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <h4>Titre du chanson</h4>
                                        <span className="singer-container">
                                            <h5>Cahnteur du chanson</h5>
                                            <span className="badge">vidéo</span>
                                        </span>
                                    </Link>
                                </li>
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