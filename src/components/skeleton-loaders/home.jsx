import Image from "next/image"

export default function HomeSkeletonLoader(){
    return(
        <section className="skeleton-songs-container">
            <ul>
                <li>
                    <div className="poster-container">
                    </div>
                    <div className="song-info">
                        <h3>Titre du chanson</h3>
                        <h4>Chanteur(s)</h4>
                        <p><span className="skeleton-badge">video</span>13 déc 2026</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}