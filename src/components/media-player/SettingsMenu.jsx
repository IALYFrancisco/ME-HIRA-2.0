import PlayerIcon from "./PlayerIcon";
import styles from "./MediaPlayer.module.css"

const SPEEDS = [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2
]

export default function SettingsMenu({
    open,
    onClose,
    playbackRate,
    onPlaybackRateChange,
    onPictureInPicture
}){}