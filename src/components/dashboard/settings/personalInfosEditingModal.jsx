export default function PersonalInfosEditingModal({personalInfosEditingModalState}){
    return(
        <section className={ personalInfosEditingModalState ? "change-personal-infos-modal enabled" : "change-personal-infos-modal"}>
            <h3>Changement sur les informations personnelles :</h3>
            <p>Afin de pouvoir modifier vos informations personnelles, vous devez vous identifier.</p>
            <p>Si votre adresse email reçoit une modification, vous serez déconnecté de votre compte puis vous authentifier à nouveau pour vous connecter.</p>
            <form>
                <div className="form-element">
                    <label htmlFor="password">Votre mot de passe :</label>
                    <input type="password" name="password" id="password" placeholder="veuillez saisir votre mot de passe" />
                </div>
                <div className="form-element">
                    <span className="border">
                        <button>Soumettre</button>
                    </span>
                </div>
            </form>
        </section>
    )
}