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

}