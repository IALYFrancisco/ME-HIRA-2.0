import PlayerIcon from "./PlayerIcon";
import VolumeControl from "./VolumeControl";
import SettingsMenu from "./SettingsMenu";

import styles from "./MediaPlayer.module.css"
import { useCallback, useRef, useState } from "react";

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

}