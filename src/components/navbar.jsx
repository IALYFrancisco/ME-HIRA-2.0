import Image from "next/image"
import Link from "next/link"

export default function Navbar (){
    return(
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                    </Link>
                </li>
                <li>
                    <span className="searchbar-container">
                        <input type="text" name="song-search" id="song-search" placeholder="Rechercher des chansons ..."/>
                        <button></button>
                    </span>
                    <button className="filter">
                        <Image src="/images/filter.png" priority alt="filtre des chansons de me-hira" width={48} height={48} className="filter-icone" />
                    </button>
                </li>
                <li>
                    <Link href="/authentication/login">
                        <button>Se connecter</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}