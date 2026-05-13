import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SongReader(){
    return(
        <>
            <Navbar/>
            <section className="song-container">
                <div className="song">
                    <div className="song-poster-container">
                        <video src="http://127.0.0.1:1234/songs/FLORIDA_RAPHAËL_-_Jerijery___Official_Hymne_Festival_Jerijery_(1080p).mp4" autoplay controls loop></video>
                    </div>
                    <div className="song-info">
                        <h1>Jerijery</h1>
                        <h2>FLORIDA RAPHAËL</h2>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}