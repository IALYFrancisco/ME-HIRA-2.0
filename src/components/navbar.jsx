import Image from "next/image"

export default function Navbar (){
    return(
        <nav>
            <ul>
                <li>
                    <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" />
                </li>
                <li></li>
                <li></li>
            </ul>
        </nav>
    )
}