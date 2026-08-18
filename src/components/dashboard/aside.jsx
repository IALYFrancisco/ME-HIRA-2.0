import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { api } from "@/helpers/api"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Sidebar(){

    const router = useRouter()
    const { user, setUser } = useAuth()
    const loaderFileSrc = user.theme === "light" ? "/images/white-dots-loader.svg" : "/images/black-dots-loader.svg"
    const artistFileSrc = user.theme === "light" ? "/images/dark-artist.png" : "/images/light-artist.png"
    const musicIconeFileSrc = user.theme === "light" ? "/images/dark-music.png" : "/images/light-music.png"
    const settingsIconeFileSrc = user.theme === "light" ? "/images/dark-settings.png" : "/images/light-settings.png"
    var [logoutIsLoading, setLogoutIsLoading] = useState(false)

    const logout = async ()=>{
        try{
            setLogoutIsLoading(true)
            await api.post('/authentication/logout')
            setUser(null)
            localStorage.removeItem("at.sid")
        }
        catch{
            toast.error("Erreur de déconnexion à votre compte, veuillez réessayer plus tard.")
        }
        finally{
            setLogoutIsLoading(false)
        }
    }

    return(
        <span className="aside-container">
            <aside>
                <ul>
                    <li className={ router.pathname === "/dashboard" ? "actif" : "" }>
                        <Link href="/dashboard">
                            <Image src={
                                    ( user.theme === "dark" && router.pathname === "/dashboard" ) ?
                                    "/images/dark-music.png" :
                                    musicIconeFileSrc
                                } alt="note melodie" width={15} height={15} priority />
                            Chansons
                        </Link>
                    </li>
                    <li className={ router.pathname === "/dashboard/artists" ? "actif" : "" }>
                        <Link href="/dashboard/artists">
                            <Image
                                src={
                                    ( user.theme === "dark" && router.pathname === "/dashboard/artists" ) ?
                                    "/images/dark-artist.png" :
                                    artistFileSrc
                                }
                                alt="artistes" width={20} height={20} priority
                            />
                            Artistes
                        </Link>
                    </li>
                    <li className={ router.pathname === "/dashboard/settings" ? "actif" : "" }>
                        <Link href="/dashboard/settings">
                            <Image src={
                                    ( user.theme === "dark" && router.pathname === "/dashboard/settings" ) ?
                                    "/images/dark-settings.png" :
                                    settingsIconeFileSrc
                                } alt="engrénage pour les paramètres" width={20} height={20} priority />
                            Paramètres
                        </Link>
                    </li>
                    <li className="logout">
                        <span>
                            <button onClick={logout}>
                                {
                                    logoutIsLoading ?
                                    <Image 
                                        src={loaderFileSrc}
                                        width={100} height={20} priority alt="buttons loader"
                                    /> :
                                    "Se déconnecter"
                                }
                            </button>
                        </span>
                    </li>
                </ul>
            </aside>
        </span>
    )
}