export default function PersonalInfosEditingForm(){
    return(
        <form>
            <h2>Informations personnelles :</h2>
            <div className="form-element">
                <label htmlFor="name">Votre nom :</label>
                <input type="text" name="name" id="name" placeholder="veuillez saisir votre nom complet."/>
            </div>
        </form>
    )
}