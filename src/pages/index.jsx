import Head from "next/head";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Me-Hira</title>
      </Head>
      <section className="homepage-container">
        <Navbar/>
        <section className="songs-container">
          <ul>
            <li>
              <div className="poster-container">
                <Image src="/images/17349978_5809368.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <video src="/vidéos/Antalaha_souvenir_-_Ny_Ainga(360p).mp4" controls loop></video>
              </div>
              <div className="song-info">
                <h3>Antalaha souvenir</h3>
                <h4>Ny Ainga</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <video src="/vidéos/FLORIDA_RAPHAËL_-_Jerijery___Official_Hymne_Festival_Jerijery_(1080p).mp4" controls loop></video>
              </div>
              <div className="song-info">
                <h3>Jerijery___Official_Hymne_Festival_Jerijery</h3>
                <h4>FLORIDA_RAPHAËL</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
            <li>
              <div className="poster-container">
                <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
              </div>
              <div className="song-info">
                <h3>Ranomasoko</h3>
                <h4>Rootsman</h4>
              </div>
            </li>
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
      </section>
      <Footer/>
    </>
  );
}