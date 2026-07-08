import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { api } from "@/helpers/api"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Sidebar(){

    const router = useRouter()
    const { setUser } = useAuth()
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
                    <li>
                        <Link href="/dashboard">
                            <Image src="/images/melody.png" alt="note melodie" width={16} height={16} priority />
                            Chansons
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/artists">
                            <Image src="/images/artist.png" alt="artistes" width={16} height={16} priority />
                            Artistes
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/settings">
                            <Image src="/images/setting.png" alt="engrénage pour les paramètres" width={16} height={16} priority />
                            Paramètres
                        </Link>
                    </li>
                    <li className="logout">
                        <span>
                            <button onClick={logout}>
                                {logoutIsLoading ? <Image src="/images/white-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> : "Se déconnecter"}
                            </button>
                        </span>
                    </li>
                </ul>
            </aside>
        </span>
    )
}