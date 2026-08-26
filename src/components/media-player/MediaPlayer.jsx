import PlayerIcon from "./PlayerIcon";
import VolumeControl from "./VolumeControl";
import SettingsMenu from "./SettingsMenu";

import styles from "./MediaPlayer.module.css"
import { useRef, useState } from "react";

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

}