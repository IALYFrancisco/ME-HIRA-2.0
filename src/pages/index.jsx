import Head from "next/head";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"
import { formatDateMG } from "@/helpers/date";
import HomeSkeletonLoader from "@/components/skeleton-loaders/home";
import { useAuth } from "@/contexts/AuthContext";
import { FormatSongSinger } from "@/helpers/song";

export default function Home() {

  var [ songs, setSongs ] = useState([])
  var [ fetchingSongLoading, setFetchingSongLoading ] = useState(true)
  const { loading } = useAuth()

  useEffect(()=>{

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get`)
    .then((response) => {
      let _songs = response.data
      _songs = _songs.filter(s=>s.published === true)
      setSongs(_songs)
    })
    .finally(()=>setFetchingSongLoading(false))

  }, [])

  return (
    <>
      <Head>
        <title>Me-Hira</title>
      </Head>
      <section className="homepage-container">
        <Navbar/>
        { (loading || fetchingSongLoading) && <HomeSkeletonLoader/>}
        {
          !loading && !fetchingSongLoading &&
          <section className="songs-container">
            <ul>
              {
                songs && songs.map((song)=>
                    <li key={song._id}>
                      <Link href={`/song/${song.slug}`}>
                        <div className="poster-container">
                          { 
                            song.fileType === "video" ?
                            <video src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.fileUrl}`} loop></video> :
                            <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
                          }
                        </div>
                        <div className="song-info">
                          <h3>{song.title}</h3>
                          <h4>{FormatSongSinger(song.singer)}</h4>
                          <p><span className="badge">{ song.fileType === 'video' ? 'vidéo' : 'audio'}</span>{formatDateMG(song.updatedAt)}</p>
                        </div>
                      </Link>
                    </li>
                )
              }
            </ul>
          </section>
        }
        <Footer/>
      </section>
    </>
  );
}