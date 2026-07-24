import Image from "next/image"
import Overlay from "@/components/overlay"
import { useState } from "react"
import ResetThemeModal from "./ResetThemeModal"
import { useTheme } from "next-themes"
import { api } from "@/helpers/api"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

export default function ThemesManager(){

    const [ overlayState, setOverlayState ] = useState(false)
    const [ resetThemeModalState, setResetThemeModalState ] = useState(false)
    const [ resetThemeActionIsLoading, setResetThemeActionIsLoading ] = useState(false)
    const [ changeThemeIsLoading, setChangeThemeIsLoading ] = useState(false)
    const { theme, setTheme } = useTheme()
    const { user } = useAuth()

    const handleClickResetThemebutton = () => {
        setOverlayState(true)
        setResetThemeModalState(true)
    }
    
    const closeOverlay = () => {
        setOverlayState(false)
        setResetThemeModalState(false)
    }

    const resetTheme = () => {
        try{
            setResetThemeActionIsLoading(true)
        }
        catch{}
        finally{
            setResetThemeActionIsLoading(false)
            closeOverlay()
        }
    }

    const changeTheme = async (_theme) => {
        try{
            if(_theme===user.theme) return
            await api.patch("/user/update", { user: user._id, update: { theme: _theme } })
            setTheme(_theme)
        }
        catch{
            return toast.error("Erreur de changement de thème, veuillez réessayer plus tard.")
        }
    }

    return(
        <>
            <section className="themes-container">
                <h2>Gestionnaire des themes :</h2>
                <p>Vous pouvez faire un choix parmi les thèmes suivants :</p>
                <ul className="themes-elements">
                    <li className="theme">
                        { 
                            theme === "system" && 
                            <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        }
                        <div onClick={()=>changeTheme("system")}>
                            <div>
                                <div className="light-theme"></div>
                                <div className="dark-theme"></div>
                            </div>
                        </div>
                        <p>Thème système</p>
                    </li>
                    <li className="theme">
                        { 
                            theme === "light" && 
                            <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        }
                        <div onClick={()=>changeTheme("light")}>
                            <div></div>
                        </div>
                        <p>Thème claire</p>
                    </li>
                    <li className="theme">
                        { 
                            theme === "dark" && 
                            <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        }
                        <div onClick={()=>changeTheme("dark")}>
                            <div></div>
                        </div>
                        <p>Thème sombre</p>
                    </li>
                </ul>
                <span className="border" onClick={handleClickResetThemebutton}>
                    <button>Réinitialiser le thème</button>
                </span>
            </section>
            <Overlay
                overlayState={overlayState}
                closeOverlay={closeOverlay}
            />
            <ResetThemeModal
                resetThemeModalState={resetThemeModalState}
                handleClickNoButton={closeOverlay}
                resetThemeActionIsLoading={resetThemeActionIsLoading}
                resetTheme={resetTheme}
            />
        </>
    )
}