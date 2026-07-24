import Image from "next/image"
import Overlay from "@/components/overlay"
import { useState } from "react"
import ResetThemeModal from "./ResetThemeModal"
import { useTheme } from "next-themes"
import { api } from "@/helpers/api"
import { useAuth } from "@/contexts/AuthContext"
import { formToJSON } from "axios"

export default function ThemesManager(){

    const [ overlayState, setOverlayState ] = useState(false)
    const [ resetThemeModalState, setResetThemeModalState ] = useState(false)
    const [ resetThemeActionIsLoading, setResetThemeActionIsLoading ] = useState(false)
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
            const data = new FormData()
            data.append("user", user._id)
            data.append("update", { theme: _theme })
            await api.patch("/user/update", formToJSON(data))
        }
        catch{

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