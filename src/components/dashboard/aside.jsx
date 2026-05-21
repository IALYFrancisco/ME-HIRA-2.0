import Link from "next/link"
import Image from "next/image"

export default function Sidebar(){
    return(
        <span className="aside-container">
            <aside>
                <ul>
                    <li>
                        <Link href="">Chansons</Link>
                    </li>
                    <li>
                        <Link href="">Artistes</Link>
                    </li>
                    <li>
                        <Link href="">Paramètres</Link>
                    </li>
                    <li className="logout">
                        <span>
                            <button>Se déconnecter</button>
                        </span>
                    </li>
                </ul>
            </aside>
        </span>
    )
}