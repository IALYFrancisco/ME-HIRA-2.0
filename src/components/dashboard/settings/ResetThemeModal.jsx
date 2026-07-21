export default function ResetThemeModal({
    resetThemeModalState
}){
    return(
        <div className={ resetThemeModalState ? "reset-theme-modal enabled" : "reset-theme-modal"}>
            <h3>Réinitialisation de thème :</h3>
            <p>Voulez-vous réinitialiser le thème de votre espace ? <br/> Si oui, le thème sera défini sur le thème par défaut ( thème claire ).</p>
            <div className="publication-song-choices">
                <span onClick={handleClickNoButton}><button disabled={songActionIsLoading} className="no">Non</button></span>
                <span>
                    <button disabled={songActionIsLoading} onClick={()=>songPublication(songToDoAction)} className="yes">
                        { 
                            songActionIsLoading ?
                            <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                            : "Oui"
                        }
                    </button>
                </span>
            </div>
        </div>
    )
}