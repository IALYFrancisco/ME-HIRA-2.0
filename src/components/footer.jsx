import Link from "next/link"

export default function Footer(){
    return(
        <footer>
            <ul>
                <li>
                    <Link href="">Conditions générales</Link>
                    |<Link href="">Politiques de confidentialité</Link>|
                    <Link href="">Mentions légales</Link>
                </li>
                <li>
                    &copyright; 2026 <Link href="/">Me-Hira</Link>
                </li>
                <li>
                    développée avec 💖 par <a href="https://lumini.onrender.com" target="_blank">LUMINI</a>
                </li>
            </ul>
        </footer>
    )
}