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
                <span>Paramètres</span>
                <button
                    type="button"
                    className={styles.settingsClose}
                    onClick={onClose}
                    aria-label="Fermer"
                >
                    <PlayerIcon name="close" size="17" />
                </button>
            </div>

            { canPi }
            
        </div>
    )

}