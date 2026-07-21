export default function ResetThemeModal({
    resetThemeModalState
}){
    return(
        <div className={ resetThemeModalState ? "reset-theme-modal enabled" : "reset-theme-modal"}>
            <h3>Réinitialisation de thème :</h3>
            <p>Voulez-vous réinitialiser le thème de votre espace ? <br/> Si oui, le thème sera défini sur le thème par défaut ( thème claire ).</p>
        </div>
    )
}