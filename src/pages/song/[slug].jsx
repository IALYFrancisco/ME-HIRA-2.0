import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { api } from "@/helpers/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head"
import { formatDateMG } from "@/helpers/date";
import SongReaderSkeletonLoader from "@/components/skeleton-loaders/songReader";
import { useAuth } from "@/contexts/AuthContext";
import { JoinArrayItems } from "@/helpers/song";
import axios from "axios";
import { ThemeProvider } from "next-themes";
import MediaPlayer from "@/components/media-player/MediaPlayer";

export async function getStaticPaths(){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get`)
    const songs = response.data.filter(s => s.published === true)

    const paths = songs.map( song => ({
        params: { slug: song.slug }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const { slug } = params
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get?slug=${slug}`)
    let song = response.data

    return {
        props: {
            song
        }
    }
}

function formatISO8601Duration(seconds){
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `PT${minutes}M${remainingSeconds}`
}

export default function SongReader({ song: _song }){
    const router = useRouter()
    const { slug } = router.query

    const [ song, setSong ] = useState(_song)
    const { loading } = useAuth()
    var [fetchSongLoading, setFetchSongLoading] = useState(true)

    var _loadersState = (loading || fetchSongLoading)

    useEffect(()=>{
        api.get(`/song/get?slug=${slug}`)
        .then((response)=>setSong(response.data))
        .finally(()=>setFetchSongLoading(false))
    }, [slug])

    const pageDescription = `Écoutez « ${song?.title} » de ${JoinArrayItems(song?.singer)} et plongez dans l'univers musical de Me-Hira.`
    const pageShareSocialMediaImage =
        (song?.thumbnailUrl.startsWith('https://')||song?.thumbnailUrl.startsWith('http://'))?
        song.thumbnailUrl:`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.thumbnailUrl}`
    const pageSEOJSON_LD = {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        "name": song?.title,
        "url": `https://mehira.onrender.com/song/${song?.slug}`,
        "image": pageShareSocialMediaImage,
        "duration": formatISO8601Duration(song?.duration),

        "byArtist": {
            "@type": "Person",
            "name": JoinArrayItems(song?.singer),
        },

        ...(song.author && {
            "lyricist": {
                "@type": "Person",
                "name": song.author
            }
        })

        ...(song.composer && {
            "composer": {
                "@type": "Person",
                "name": song.composer
            }
        })

        ...(song.album && {
            "inAlbum": {
                "@type": "MusicAlbum",
                "name": song.album
            }
        })

    }

    return(
        <ThemeProvider
            attribute="class"
            forcedTheme="light"
        >
            <Head>
                <title>{`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`}</title>
                <link rel="canonical" href={`https://mehira.onrender.com/song/${song?.slug}`} />
                <meta name="description" content={pageDescription}/>
                <meta property="og:type" content="music.song" key="og:type" />
                <meta property="og:title" content={`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`} />
                <meta property="og:url" content={`https://mehira.onrender.com/song/${song?.slug}`} />
                <meta property="og:image" content={pageShareSocialMediaImage} key="og:image" />
                <meta property="og:image:alt" content={`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`} />
                <meta property="og:description" content={pageDescription}/>
                <meta property="music:duration" content={song.duration}/>
                <meta name="twitter:title" content={`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageShareSocialMediaImage} key="twitter:image" />
                <meta name="twitter:image:alt" content={`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`} />
            </Head>
            <Navbar/>
            { _loadersState && <SongReaderSkeletonLoader/>}
            {!_loadersState && <section className="song-container">
                <div className="song">
                    <div className="song-poster-container">
                        <MediaPlayer
                            autoPlay={true}
                            song={song}
                            poster={
                                (song.thumbnailUrl.startsWith('https://')||song.thumbnailUrl.startsWith('http://'))?
                                song.thumbnailUrl:`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.thumbnailUrl}`
                            }
                        />
                    </div>
                    <div className="song-info">
                        <h1>{song.title}</h1>
                        <h2>{JoinArrayItems(song.singer)}</h2>
                        <p><span className="badge">{song.fileType}</span>{formatDateMG(song.updatedAt)}</p>
                    </div>
                </div>
            </section> }
            <Footer/>
        </ThemeProvider>
    )
}