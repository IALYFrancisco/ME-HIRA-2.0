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
    const [ themeChoice, setThemeChoice ] = useState("")
    const { theme } = useTheme()
    const { user, setUser } = useAuth()

    const handleClickResetThemebutton = () => {
        if(user.theme==="light") return
        setOverlayState(true)
        setResetThemeModalState(true)
    }
    
    const closeOverlay = () => {
        setOverlayState(false)
        setResetThemeModalState(false)
    }

    const resetTheme = async () => {
        try{
            setResetThemeActionIsLoading(true)
            if(user.theme === "light") return
            await api.patch("/user/update", { user: user._id, update: { theme: "light" } })
            const getUserInformationsResponse = await api.get("/user/informations")
            setUser(getUserInformationsResponse.data)
        }
        catch{
            return toast.error("Erreur de réinitialisation de thème, veuillez réessayer plus tard.")
        }
        finally{
            setResetThemeActionIsLoading(false)
            closeOverlay()
        }
    }

    const changeTheme = async (_theme) => {
        try{
            setThemeChoice(_theme)
            setChangeThemeIsLoading(true)
            if(_theme===user.theme) return
            await api.patch("/user/update", { user: user._id, update: { theme: _theme } })
            const getUserInformationsResponse = await api.get("/user/informations")
            setUser(getUserInformationsResponse.data)
        }
        catch(error){
            console.log(error)
            return toast.error("Erreur de changement de thème, veuillez réessayer plus tard.")
        }
        finally{
            setChangeThemeIsLoading(false)
            setThemeChoice("")
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
                            !changeThemeIsLoading &&
                            theme === "system" && 
                            <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        }
                        {
                            changeThemeIsLoading &&
                            themeChoice === "system" &&
                            <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                            
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
                            !changeThemeIsLoading &&
                            theme === "light" && 
                            <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        }
                        {
                            changeThemeIsLoading &&
                            themeChoice === "light" &&
                            <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />                        
                        }
                        <div onClick={()=>changeTheme("light")}>
                            <div></div>
                        </div>
                        <p>Thème claire</p>
                    </li>
                    <li className="theme">
                        { 
                            !changeThemeIsLoading &&
                            theme === "dark" && 
                            <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        }
                        {
                            changeThemeIsLoading &&
                            themeChoice === "dark" &&
                            <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />                        
                        }
                        <div onClick={()=>changeTheme("dark")}>
                            <div></div>
                        </div>
                        <p>Thème sombre</p>
                    </li>
                </ul>
                <span className={ user.theme !== "light" ? "border" : "border enabled"} onClick={handleClickResetThemebutton}>
                    <button disabled={user.theme !== "ligth"} >Réinitialiser le thème</button>
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