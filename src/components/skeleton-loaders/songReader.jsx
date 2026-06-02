export default function SongReaderSkeletonLoader(){
    return(
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
    )
}