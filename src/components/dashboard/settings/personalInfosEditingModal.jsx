import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { useForm } from "react-hook-form"

export default function PersonalInfosEditingModal({personalInfosEditingModalState}){

    const { register, handleSubmit } = useForm()
    const { user } = useAuth()

    const checkUser = async (data) => {
        try{
            const user = new FormData()
            user.append("_id", user._id)
            user.append("password", data.password)
            let checkResponse = await api.post("/user/check", { user })

        }
        catch{

        }
    }

    return(
        <section className={ personalInfosEditingModalState ? "change-personal-infos-modal enabled" : "change-personal-infos-modal"}>
            <h3>Changement sur les informations personnelles :</h3>
            <p>Afin de pouvoir modifier vos informations personnelles, vous devez vous identifier.</p>
            <p>Si votre adresse email reçoit une modification, vous serez déconnecté de votre compte puis vous authentifier à nouveau pour vous connecter.</p>
            <form onSubmit={handleSubmit(checkUser)}>
                <div className="form-element">
                    <label htmlFor="password">Votre mot de passe :</label>
                    <input type="password" id="password" { ...register("password", {required:true}) } placeholder="veuillez saisir votre mot de passe" required />
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