export default function ResetThemeModal({
    resetThemeModalState
}){
    return(
        <div className={ resetThemeModalState ? "reset-theme-modal enabled" : "reset-theme-modal"}>
            <h3>Réinitialisation de thème :</h3>
        </div>
    )
}