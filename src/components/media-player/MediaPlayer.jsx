import PlayerIcon from "./PlayerIcon";
import VolumeControl from "./VolumeControl";
import SettingsMenu from "./SettingsMenu";

import styles from "./MediaPlayer.module.css"
import { useCallback, useEffect, useRef, useState } from "react";
import { FormatSongDuration } from "@/helpers/song";

function getMediaUrl(fileUrl){

    if(!fileUrl) return ""

    if( fileUrl.startsWith("https://") || fileUrl.startsWith("http://") ) return fileUrl

    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${fileUrl}`

}

export default function MediaPlayer({
    song,
    onNext,
    onPrev,
    autoPlay = false,
    poster,
    className = ""
}){

    const mediaRef = useRef(null)
    const playerRef = useRef(null)

    const hideControlsTimerRef = useRef(null)

    const [ playing, setPlaying ] = useState(false)

    const [ currentTime, setCurrentTime ] = useState(0)

    const [ duration, setDuration ] = useState(0)

    const [ volume, setVolume ] = useState(1)

    const [ muted, setMuted ] = useState(false)

    const [ playbackRate, setPlaybackRate ] = useState(1)

    const [ settingsOpen, setSettingsOpen ] = useState(false)

    const [ fullscreen, setFullscreen ] = useState(false)

    const [ controlsVisible, setControlsVisible ] = useState(true)

    const [ videoRatio, setVideoRatio ] = useState(null)

    const [ loading, setLoading ] = useState(false)

    const isVideo = song?.fileType === "video"

    const mediaUrl = getMediaUrl(song?.fileUrl)

    // Détecte si le navigateur supporte PiP
    const canPictureInPicture =
        typeof document !== "undefined" &&
        "pictureInPictureEnabled" in document &&
        document.pictureInPictureEnabled &&
        isVideo;

    // Nettoyage du timer des contrôles
    const clearControlsTimer = useCallback(()=>{

        if(hideControlsTimerRef.current){

            clearTimeout(hideControlsTimerRef.current)

            hideControlsTimerRef.current = null

        }

    }, [])

    // Cache automatiquement les contrôles pendant la lecture
    const showControls = useCallback(()=>{

        clearControlsTimer()

        setControlsVisible(true)

        if(!playing){
            return
        }

        hideControlsTimerRef.current = setTimeout(()=>{

            if(!settingsOpen){

                setControlsVisible(false)

            }

        }, 3000)

    }, [clearControlsTimer, playing, settingsOpen])

    // Play / Pause
    const togglePlay = useCallback( async () => {

        const media = mediaRef.current

        if (!media) return

        try {

            if( media.paused){
                await media.play()
            } else {
                media.pause()
            }

        }catch(error){
            console.error("Impossible de lire le média", error)
        }

    }, [])

    // Mise à jour de l'état local play/pause
    const handlePlay = () => {
        setPlaying(true)
        showControls()
    }

    const handlePause = () => {
        setPlaying(false)
        setControlsVisible(true)
        clearControlsTimer()
    }

    // Metadata chargée
    const handleLoadedMetadata = () => {

        const media = mediaRef.current

        if(!media) return

        setDuration( Number.isFinite(media.duration) ? media.duration : 0 )

        // Pour les vidéos, on récupère le vrai ratio largeur /hauteur
        // Cela permet au conteneur de suivre exactement le ratio de chaque vidéo
        if ( isVideo && media.videoWidth && media.videoHeight ) {

            const ratio = media.videoWidth / media.videoHeight

            setVideoRatio(ratio)

        } else {

            setVideoRatio(null)

        }

        // Conservation de la vitesse actuelle
        media.playbackRate = playbackRate

        // Restauration du volume
        media.volume = volume
        media.muted = muted

    }

    // Gestionnaire de progression de lecture
    const handleTimeUpdate = () => {

        const media = mediaRef.current

        if(!media) return

        setCurrentTime(media.currentTime)

    }

    // Fin du lecture | Le lecteur ne passe pas automatiquement au suivant.
    // Le bouton next rest contrôlé par le parent
    const handleEnded = () => {

        setPlaying(false)
        setControlsVisible(true)
        clearControlsTimer()

    }

    // Gestionnaire de changement de volume
    const handleVolumeChange = (value) => {

        const media = mediaRef.current

        const newVolume = Math.max(0, Math.min(1, value))

        setVolume(newVolume)

        if(!media) return

        media.volume = newVolume

        if(newVolume > 0){
            media.muted = false
            setMuted(false)
        } else {
            media.muted = true
            setMuted(true)
        }

    }

    // Gestionnaire des actions Mute/UnMute
    const toggleMute = () => {

        const media = mediaRef.current

        if(!media) return

        if(media.muted || media.volume === 0) {

            media.muted = false

            // Si le volume était à 0, on restaure 50%
            if ( media.volume === 0 ) {

                media.volume = volume > 0 ? volume : 0.5
                setVolume(media.volume)

            }

            setMuted(false)

        } else {

            media.muted = true
            setMuted(true)

        }

    }

    // Fonction gestionnaire de progression de lecture de chanson
    const handleProgressChange = (event) => {

        const media = mediaRef.current

        if(!media || !duration) return

        const newTime = Number(event.target.value)

        media.currentTime = newTime

        setCurrentTime(newTime)

    }

    // Gestionnaire des vitesses de lecture de chanson
    const handlePlaybackRateChange = (rate) => {

        const media = mediaRef.current

        setPlaybackRate(rate)

        if(media){
            media.playbackRate = rate
        }

    }

    // Gestionnaire de lecture en incrustation
    const handlePictureInPicture = async () => {
        
        const media = mediaRef.current

        if(!media) return

        try{

            // On quite si le navigateur est déjà en PiP
            if( document.pictureInPictureElement ) {

                await document.exitPictureInPicture()
                return

            }

            if(
                document.pictureInPictureEnabled &&
                typeof media.requestPictureInPicture ===
                "function"
            ){
                await media.requestPictureInPicture()
            }

        }
        catch (error) {
            console.error("Picture-in-Picture indisponible ", error)
        }

    }

    // Gestionnaire de lecture en plein écran
    const toggleFullscreen = async () => {

        const player = playerRef.current

        if(!player) return

        try{

            if( !document.fullscreenElement ){
                
                if(player.requestFullscreen){
                    await player.requestFullscreen()
                } else if (mediaRef.current?.webkitEnterFullscreen) {
                    // Support navigateurSafari iOS lorsque disponible
                    mediaRef.current.webkitEnterFullscreen()
                }

            } else {
                await document.exitFullscreen()
            }

        }
        catch(error){
            console.error("Fullscreen indisponible :", error)
        }

    }

    // Détéction des requêtes de lecture en plein écran
    useEffect(()=>{

        const handleFullscreenChange = () => {
            setFullscreen(Boolean(document.fullscreenElement))
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)

        return () => { document.removeEventListener("fullscreenchange", handleFullscreenChange) }

    }, [])

    // Quand la chanson change
    useEffect(()=>{

        const media = mediaRef.current

        if (!media) return

        media.pause()

        setPlaying(false)
        setCurrentTime(0)
        setDuration(0)
        setVideoRatio(null)
        setLoading(true)
        setControlsVisible(true)

        clearControlsTimer()

    }, [clearControlsTimer, mediaUrl])

    // Gestion de lecteur au chargement du média ( autoplay ou pas )
    useEffect(()=>{

        if(!autoPlay) return

        const media = mediaRef.current

        if(!media) return

        const playMedia = async () => {

            try{ await media.play() }
            catch{ 
                // Le navigateur peut bloquer autoplay avec son
             }

        }

        playMedia()

    }, [autoPlay, mediaUrl])

    // Nettoyage générale des timers
    useEffect(()=>{
        return () => {
            clearControlsTimer()
        }
    }, [clearControlsTimer])

    // Gestionnaire des actions venant du clavier
    useEffect(() => {

        const handleKeyDown = (event) => {

            // Ne pas intercepter les touches lorqu'on écrit dans un input
            const tag = event.target?.tagName?.toLowerCase()

            if( tag === "input" || tag === "textarea" ) return

            switch (event.node) {

                case "Space" :
                    event.preventDefault()
                    togglePlay()
                    break

                case "ArrowRight" : {

                    const media = mediaRef.current

                    if(!media) return

                    media.currentTime = Math.min(
                        media.duration || 0,
                        media.currentTime + 5
                    )
                    break

                }

                case "ArrowLeft": {

                    const media = mediaRef.current

                    if(!media) return

                    media.currentTime = Math.max(0, media.currentTime - 5)
                    break

                }

                case "ArrowUp" : {

                    const media = mediaRef.current

                    if(!media) return

                    event.preventDefault()
                    handleVolumeChange(Math.min(1, media.volume + 0.05))
                    break

                }

                case "ArrowDown": {

                    const media = mediaRef.current

                    if(!media) return

                    event.preventDefault()
                    handleVolumeChange(Math.max(0, media.volume - 0.05))
                    break

                }

                case "KeyM" :
                    toggleMute()
                    break

                case "KeyF" :
                    toggleFullscreen()
                    break

                default:
                    break

            }

        }

        document.addEventListener("keydown", handleKeyDown)

        return () => { document.removeEventListener("keydown", handleKeyDown) }

    })

    // Syle du conteneur média.
    // pour une vidéo : width 100%, aspect-ratio: ratio réel => hauteur calculée automatiquement
    const mediaContainerStyle =
        isVideo && videoRatio ? { aspectRatio: `${videoRatio}` } : undefined

    // Pour la barre de progresion de lecture
    const progressPercentage =
        duration > 0 ? (currentTime/duration) * 100 : 0
    
    if(!mediaUrl) {

        return(
            <div className={ `${styles.player} ${styles.playerError} ${className}` }>Média introuvable</div>
        )

    }

    return(
        <div 
            ref={playerRef}
            className={ `${styles.player} ${isVideo ? styles.videoPlayer : styles.audioPlayer} ${fullscreen ? styles.fullscreenPlayer : ""} ${className}` }
            onMouseMove={showControls}
            onTouchStart={showControls}
        >
            <div
                className={styles.mediaContainer}
                style={mediaContainerStyle}
                onDoubleClick={toggleFullscreen}
            >
                {
                    isVideo ? (
                        <video 
                            ref={mediaRef}
                            key={mediaUrl}
                            className={styles.video}
                            src={mediaUrl}
                            poster={poster}
                            playsInline
                            preload="metadata"
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEnded}
                            onWaiting={()=>setLoading(true)}
                            onCanPlay={()=>setLoading(false)}
                            onError={(event)=>{ console.error("Erreur vidéo :", event.currentTarget.error) }}
                        ></video>
                    ) : (
                        <div className={styles.audioVisualization}>
                            { song?.thumnailUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={song.thumnailUrl}
                                        alt={song.title}
                                        className={ styles.audioArtwork }
                                    />
                                ) : (
                                    <div
                                        className={styles.audioArtworkPlaceholder}
                                    >
                                        <PlayerIcon name="play" size={42} />
                                    </div>
                                )
                            }
                            <div className={styles.audioInformation}>
                                <div
                                    className={ styles.audioTitle }
                                >
                                    { song?.title || "Lecture audio" }
                                </div>
                                {
                                    Array.isArray(song?.singer) &&
                                    (
                                        <div
                                            className={
                                                styles.audioSinger
                                            }
                                        >
                                            { song.singer.join(", ") }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                {
                    !isVideo && (

                        <audio
                            ref={mediaRef}
                            key={mediaUrl}
                            src={mediaUrl}
                            preload="metadata"
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEnded}
                            onWaiting={()=>setLoading(true)}
                            onCanPlay={()=>setLoading(false)}
                        ></audio>

                    )
                }
                {
                    loading && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.spinner}></div>
                        </div>
                    )
                }
                {/* Les contrôles dans le lecteur personnalisés */}
                <div
                    className={ `${styles.controls} ${controlsVisible ? styles.controlsVisible : styles.controlsHidden }` }
                    onClick={(event)=>{ event.stopPropagation() }}
                >
                    {/* La barre de progression de lecture */}
                    <div className={styles.progressContainer} >
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={currentTime}
                            onChange={handleProgressChange}
                            className={ styles.progressSlider }
                            style={{ "--progress": `${progressPercentage} %` }}
                            aria-label="Progression"
                        />
                    </div>
                    <div className={ styles.controlsRow } >
                        <div className={styles.controlsLeft}>
                            {/* Previous */}
                            <button
                                type="button"
                                className={styles.controlButton}
                                onClick={()=>{
                                    if(onPrev){
                                        onPrev()
                                    }
                                }}
                                disabled={!onPrev}
                                aria-label="Précédent"
                                title="Précédent"
                            >
                                <PlayerIcon name="previous" size={19} />
                            </button>

                            {/* Play | Pause */}
                            <button
                                type="button"
                                className={`${styles.controlButton} ${styles.playButton}`}
                                onClick={togglePlay}
                                aria-label={ playing ? "Pause" : "Lecture" }
                                title={ playing ? "Pause" : "Lecture" }
                            >
                                <PlayerIcon name={ playing ? "pause" : "play" } size={21} />
                            </button>

                            {/* Next */}
                            <button
                                type="button"
                                className={ styles.controlButton }
                                onClick={()=>{ if(onNext){ onNext() } }}
                                disabled={!onNext}
                                aria-label="Suivant"
                                title="Suivant"
                            >
                                <PlayerIcon name="next" size={19} />
                            </button>

                            {/* Durée et temps écoulés dans le lecture */}
                            <div className={styles.timeDisplay} >
                                <span>{FormatSongDuration(currentTime)}</span>
                                <span className={styles.timeSeparator}>/</span>
                                <span>{FormatSongDuration(duration)}</span>
                            </div>
                        </div>
                        <div className={styles.controlsRight}>
                            {/* Gestionnaire de volume dans le lecteur personnalisé */}
                            <VolumeControl
                                volume={volume}
                                muted={muted}
                                onVolumeChange={handleVolumeChange}
                                onMute={toggleMute}
                            />
                            {/* Paramètres pour d'autres actions sur le lecteur personnalisé */}
                            <div
                                className={styles.settingsWrapper}
                            >
                                <button
                                    type="button"
                                    className={ styles.controlButton }
                                    onClick={()=>{
                                        setSettingsOpen(previous=>!previous)
                                        setControlsVisible(true)
                                    }}
                                    aria-label="Paramètres"
                                    title="Paramètres"
                                >
                                    <PlayerIcon name="settings" size={19} />
                                </button>
                                <SettingsMenu
                                    open={settingsOpen}
                                    onClose={()=>setSettingsOpen(false)}
                                    playbackRate={playbackRate}
                                    onPlaybackRateChange={handlePlaybackRateChange}
                                    onPictureInPicture={handlePictureInPicture}
                                    canPictureInPicture={canPictureInPicture}
                                />
                            </div>

                            {/* Gestionnaire des lectures en plein écran */}
                            <button
                                type="button"
                                className={styles.controlButton}
                                onClick={toggleFullscreen}
                                aria-label={ fullscreen ? "Quitter le plein écran" : "Plein écran" }
                                title={ fullscreen ? "Quitter le plein écran" : "Plein écran" }
                            >
                                <PlayerIcon name={fullscreen ? "fullscreenExit" : "fullscreen"} size={19} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}