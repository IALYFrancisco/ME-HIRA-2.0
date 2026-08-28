import PlayerIcon from "./PlayerIcon";
import styles from "./MediaPlayer.module.css"
import { useEffect, useRef } from "react";

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
    onPictureInPicture,
    canPictureInPicture
}){

    const menuRef = useRef(null)

    useEffect(()=>{

        if(!open) return;

        const handleClickOutside = (event) => {

            if(menuRef.current && !menuRef.current.contains(event.target)){
                onClose()
            }

        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }

    },[onClose, open])

    if(!open) return null

    return(
        <div ref={menuRef} className={styles.settingsMenu} >

            <div className={styles.settingsHeader}>
                <span>Réglages</span>
                <button
                    type="button"
                    className={styles.settingsClose}
                    onClick={onClose}
                    aria-label="Fermer"
                >
                    <PlayerIcon name="close" size="14" />
                </button>
            </div>

            { canPictureInPicture && (
                <button
                    type="button"
                    className={styles.settingsItem}
                    onClick={()=>{
                        onPictureInPicture();
                        onClose();
                    }}
                >
                    <div className={ styles.settingsItemLeft } >
                        <PlayerIcon name="pip" size={18} />
                        <span>Lecture en incrustation</span>
                    </div>
                </button>
            ) }

            <div className={ styles.settingsSection } >

                <div className={ styles.settingsLabel }>Vitesse de lecture</div>
                <div className={ styles.speedList }>

                    { SPEEDS.map((speed) => (
                        <button
                            key={speed}
                            type="button"
                            className={`${styles.speedButton} ${ playbackRate === speed ? styles.speedButtonActive : "" }`}
                            onClick={()=>{
                                onPlaybackRateChange();
                                onClose();
                            }}
                        >
                            { speed === 1 ? "Normal" : `${speed}x` }
                        </button>
                    ) ) }

                </div>

            </div>
            
        </div>
    )

}