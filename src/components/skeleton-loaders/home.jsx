import Image from "next/image"

export default function HomeSkeletonLoader(){
    return(
        <section className="songs-container">
            <ul>
                <li>
                    <div className="poster-container">
                        <Image src="/images/Application-mobile.jpg" width={250} height={150} priority alt="poster pour les fichiers audio" className="audio-poster"/>
                    </div>
                    <div className="song-info">
                        <h3>Titre du chanson</h3>
                        <h4>Chanteur(s)</h4>
                        <p><span className="badge">video</span>13 déc 2026</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}