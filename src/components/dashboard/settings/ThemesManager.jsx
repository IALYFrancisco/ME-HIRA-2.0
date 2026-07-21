import Image from "next/image"
import Overlay from "@/components/overlay"

export default function ThemesManager(){

    const [ overlayState, setOverlayState ] = useState(false)

    return(
        <>
            <section className="themes-container">
                <h2>Gestionnaire des themes :</h2>
                <p>Vous pouvez faire un choix parmi les thèmes suivants :</p>
                <ul className="themes-elements">
                    <li className="theme">
                        <div>
                            <div>
                                <div className="light-theme"></div>
                                <div className="dark-theme"></div>
                            </div>
                        </div>
                        <p>Thème système</p>
                    </li>
                    <li className="theme">
                        <Image src="/images/check.png" width={24} height={24} alt="check for current theme" priority />
                        <div>
                            <div></div>
                        </div>
                        <p>Thème claire</p>
                    </li>
                    <li className="theme">
                        <div>
                            <div></div>
                        </div>
                        <p>Thème sombre</p>
                    </li>
                </ul>
                <span className="border">
                    <button>Réinitialiser le thème</button>
                </span>
            </section>
            <Overlay/>
        </>
    )
}