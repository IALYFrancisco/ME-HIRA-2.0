import Head from "next/head";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import Link from "next/link"
import { formatDateMG } from "@/helpers/date";
import HomeSkeletonLoader from "@/components/skeleton-loaders/home";
import { useAuth } from "@/contexts/AuthContext";
import { FormatSongDuration, JoinArrayItems } from "@/helpers/song";
import { api } from "@/helpers/api";
import { ThemeProvider } from "next-themes";

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
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
    >
      <Head>
        <title>Me-Hira - Écoutez vos chansons préférées en ligne</title>
        <link rel="canonical" href="https://mehira.onrender.com" />
        <meta name="description" content="Explorez un catalogue musical varié, retrouvez vos artistes favoris et profitez d'une expérience musicale simple, fluide et personnalisée avec Me-Hira."/>
        <meta property="og:description" content="Explorez un catalogue musical varié, retrouvez vos artistes favoris et profitez d'une expérience musicale simple, fluide et personnalisée avec Me-Hira."/>
        <meta name="twitter:description" content="Explorez un catalogue musical varié, retrouvez vos artistes favoris et profitez d'une expérience musicale simple, fluide et personnalisée avec Me-Hira." />
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
                          <Image src={(song.thumbnailUrl.startsWith('https://')||song.thumbnailUrl.startsWith('http://'))?
                            song.thumbnailUrl:`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.thumbnailUrl}`
                          } width={250} height={150} priority alt={song.title} className={ song.fileType === "video" ? "thumbnail video" : "thumbnail audio" }/>
                          <span className="duration">
                            {FormatSongDuration(song.duration)}
                          </span>
                        </div>
                        <div className="song-info">
                          <h3>{song.title}</h3>
                          <h4>{JoinArrayItems(song.singer)}</h4>
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
    </ThemeProvider>
  );
}