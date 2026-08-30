import PlayerIcon from "./PlayerIcon";
import styles from "./MediaPlayer.module.css"

export default function VolumeControl({
    volume,
    muted,
    onVolumeChange,
    onMute
}){

    const handleVolumeChange = (event) => {
        const value = Number(event.target.value);
        onVolumeChange(value)
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
            <div className={styles.volumeSliderContainer}>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={ muted ? 0 : volume }
                    onChange={handleVolumeChange}
                    className={styles.volumeSlider}
                    style={{ "--volume": `${(muted ? 0 : volume) * 100}%` }}
                    aria-label="volume"
                />
            </div>
        </div>
    )

}