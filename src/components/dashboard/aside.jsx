import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { api } from "@/helpers/api"

export default function Sidebar(){

    const { setUser } = useAuth()

    const logout = async ()=>{
        try{
            await api.post('/authentication/logout')
            setUser(null)
            localStorage.removeItem("at.sid")
        }
        catch{
            toast.error("Erreur de déconnexion à votre compte, veuillez réessayer plus tard.")
        }
    }

    return(
        <span className="aside-container">
            <aside>
                <ul>
                    <li>
                        <Link href="">
                            <Image src="/images/melody.png" alt="note melodie" width={16} height={16} priority />
                            Chansons
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <Image src="/images/artist.png" alt="note melodie" width={16} height={16} priority />
                            Artistes
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <Image src="/images/setting.png" alt="note melodie" width={16} height={16} priority />
                            Paramètres
                        </Link>
                    </li>
                    <li className="logout">
                        <span>
                            <button onClick={logout}>Se déconnecter</button>
                        </span>
                    </li>
                </ul>
            </aside>
        </span>
    )
}