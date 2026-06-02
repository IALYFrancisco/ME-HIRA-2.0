import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head"
import { formatDateMG } from "@/helpers/date";
import SongReaderSkeletonLoader from "@/components/skeleton-loaders/songReader";

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

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get?slug=${slug}`)
        .then((response)=>setSong(response.data))
    }, [slug])

    return(
        <>
            <Head>
                <title>{song?.title} - {song?.singer} - Me-Hira</title>
            </Head>
            <Navbar/>
            <SongReaderSkeletonLoader/>
            <section className="song-container">
                <div className="song">
                    <div className="song-poster-container">
                        <video src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.fileUrl}`} autoPlay controls loop></video>
                    </div>
                    <div className="song-info">
                        <h1>{song.title}</h1>
                        <h2>{song.singer}</h2>
                        <p><span className="badge">{song.fileType}</span>{formatDateMG(song.updatedAt)}</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}