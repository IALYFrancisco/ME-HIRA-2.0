export default function HomeSkeletonLoader(){
    return(
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
                                <h4>{song.singer}</h4>
                                <p><span className="badge">{ song.fileType === 'video' ? 'vidéo' : 'audio'}</span>{formatDateMG(song.updatedAt)}</p>
                              </div>
                            </Link>
                          </li>
                      )
                    }
                  </ul>
                </section>
    )
}