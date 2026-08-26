import PlayerIcon from "./PlayerIcon";
import styles from "./MediaPlayer.module.css"

export default function VolumeControl({
    volume,
    muted,
    noVolumeChange,
    onMute
}){

    const handleVolumeChange = (event) => {
        const value = Number(event.target.value);
        noVolumeChange(value)
    }

    return(
        <div className={styles.volumeContainer}>
            <button
                type="button"
                className={styles.controlButton}
                onClick={onMute}
                aria-label={ muted || volume === 0 ? "Activer le son" : "Couper le son" }
                title={ muted || volume === 0 ? "Activer le son" : "Couper le son" }
            >
                <PlayerIcon
                    name={ muted || volume === 0 ? "mute" : "volume" }
                    size={19}
                />
            </button>
        </div>
    )

}