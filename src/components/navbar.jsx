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
                    <input type="text" name="song-search" id="song-search" />
                </li>
                <li></li>
            </ul>
        </nav>
    )
}