import PlayerIcon from "./PlayerIcon";
import styles from "./MediaPlayer.module.css"

export default function VolumeControl({
    volume,
    muted,
    noVolumeChange,
    noMute
}){

    const handleVolumeChange = (event) => {
        const value = Number(event.target.value);
        noVolumeChange(value)
    }

}