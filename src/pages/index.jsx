import Head from "next/head";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  var [ songs, setSongs ] = useState([])

  useEffect(()=>{

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get`)
    .then((response) => setSongs(response.data))
    

  }, [])

  return (
    <>
      <Head>
        <title>Me-Hira</title>
      </Head>
      <section className="homepage-container">
        <Navbar/>
        <section className="songs-container">
          <ul>
            {
              songs && songs.map((song)=>{
                <li>
                  <div className="poster-container">
                    <video src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${song.fileUrl}`} controls loop></video>
                  </div>
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <h4>{song.singer}</h4>
                  </div>
                </li>
              })
            }
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
          </ul>
        </section>
        <Footer/>
      </section>
    </>
  );
}