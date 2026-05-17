import Link from "next/link"
import Image from "next/image"

export default function Sidebar(){
    return(
        <aside>
            <ul>
                <li>
                    <Link href="/">
                        <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                    </Link>
                </li>
                <li>
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
                </li>
            </ul>
        </aside>
    )
}