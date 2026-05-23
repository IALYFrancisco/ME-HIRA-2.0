import Link from "next/link"
import Image from "next/image"

export default function Sidebar(){
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