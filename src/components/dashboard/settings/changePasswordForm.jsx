export default function ChangePasswordForm(){
    return(
        <form>
            <h2>Mot de passe :</h2>
            <div className="form-element">
                <label htmlFor="password">Votre mot de passe actuel :</label>
                <input type="password" name="password" id="password" required placeholder="veuillez choisir un mot de passe fort" />
            </div>
        </form>
    )
}