export default function ThemesManager(){
    return(
        <section className="themes-container">
            <h2>Gestionnaire des themes :</h2>
            <p>Vous pouvez faire un choix parmi les thèmes suivants :</p>
            <ul className="themes-elements">
                <li className="theme">
                    <div>
                        <div className="light-theme"></div>
                        <div className="dark-theme"></div>
                    </div>
                </li>
                <li className="theme">
                    <div></div>
                </li>
                <li className="theme">
                    <div></div>
                </li>
            </ul>
        </section>
    )
}