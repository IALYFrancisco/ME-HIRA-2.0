import { useForm } from "react-hook-form";

export default function PersonalInfosEditingForm(){

    const { register } = useForm()

    return(
        <form>
            <h2>Informations personnelles :</h2>
            <div className="form-element">
                <label htmlFor="name">Votre nom :</label>
                <input type="text" id="name" placeholder="veuillez saisir votre nom complet" { ...register("name", { required: true }) } required/>
            </div>
            <div className="form-element">
                <label htmlFor="email">Votre email :</label>
                <input type="email" id="email" placeholder="veuillez saisir votre adresse email" { ...register("email", { required: true }) } required/>
            </div>
        </form>
    )
}