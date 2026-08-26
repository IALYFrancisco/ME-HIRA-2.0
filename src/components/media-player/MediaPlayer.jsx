import PlayerIcon from "./PlayerIcon";
import VolumeControl from "./VolumeControl";
import SettingsMenu from "./SettingsMenu";

import styles from "./MediaPlayer.module.css"
import { useCallback, useEffect, useRef, useState } from "react";

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
    const handleLoadMetadata = () => {

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
                    await play.requestFullscreen()
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

}