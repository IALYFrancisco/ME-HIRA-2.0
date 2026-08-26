import PlayerIcon from "./PlayerIcon";
import VolumeControl from "./VolumeControl";
import SettingsMenu from "./SettingsMenu";

import styles from "./MediaPlayer.module.css"
import { useRef, useState } from "react";

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

}