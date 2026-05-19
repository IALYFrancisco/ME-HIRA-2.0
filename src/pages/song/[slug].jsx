import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";

export async function getStaticPaths(){
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/get`)
    const songs = response.data

    const paths = songs.map( song => {
        params: { slug: song.slug }
    })

    return {
        paths,
        fallback: false
    }
}

export default function SongReader(){
    return(
        <>
            <Navbar/>
            <section className="song-container">
                <div className="song">
                    <div className="song-poster-container">
                        <video src="http://127.0.0.1:1234/songs/FLORIDA_RAPHAËL_-_Jerijery___Official_Hymne_Festival_Jerijery_(1080p).mp4" autoPlay controls loop></video>
                    </div>
                    <div className="song-info">
                        <h1>Jerijery</h1>
                        <h2>FLORIDA RAPHAËL</h2>
                        <p><span className="badge">vidéo</span>13 mai 2026</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}