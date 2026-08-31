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

    return(
        <ThemeProvider
            attribute="class"
            forcedTheme="light"
        >
            <Head>
                <title>{`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`}</title>
                <meta property="og:title" content={`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`} />
                <meta name="twitter:title" content={`${song?.title} - ${JoinArrayItems(song?.singer)} - Me-Hira`} />
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