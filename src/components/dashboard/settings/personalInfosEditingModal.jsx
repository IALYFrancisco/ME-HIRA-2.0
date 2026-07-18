import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function PersonalInfosEditingModal({personalInfosEditingModalState}){

    const { register, handleSubmit } = useForm()
    const { user } = useAuth()
    const [ userCanChange, setUserCanChange ] = useState(false)

    const checkUser = async (data) => {
        try{
            const _user = new FormData()
            _user.append("_id", user._id)
            _user.append("password", data.password)
            await api.post("/user/check", { user: _user })
            setUserCanChange(true)
        }
        catch(error){
            if(error.status === 404){
                toast.warning("Vous n'êtes pas autorisé à faire cette action.")
            }
            if(error.status === 403){
                toast.warning("Mot de passe incorrect.")
            }
            if(error.status === 500){
                toast.error("Erreur de vérification d'utilisateur, veuillez réessayer plus tard.")
            }
            setUserCanChange(false)
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
            <form>
                
            </form>
        </section>
    )
}