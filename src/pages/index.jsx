import Head from "next/head";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import Link from "next/link"
import { formatDateMG } from "@/helpers/date";
import HomeSkeletonLoader from "@/components/skeleton-loaders/home";
import { useAuth } from "@/contexts/AuthContext";
import { FormatSongSinger } from "@/helpers/song";
import { api } from "@/helpers/api";

export default function Home() {

  var [ songs, setSongs ] = useState([])
  var [ fetchingSongLoading, setFetchingSongLoading ] = useState(true)
  const { loading } = useAuth()

  useEffect(()=>{

    api.get('/song/get')
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
                            <Image src={(song.thumbnailUrl.startsWith('https://')||song.thumbnailUrl.startsWith('http://'))?
                              song.thumbnailUrl:`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.thumbnailUrl}`
                            } width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
                          }
                          <span className="duration">
                            01 : 30 : 15
                          </span>
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