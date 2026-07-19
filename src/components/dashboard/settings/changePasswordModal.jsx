import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { formToJSON } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"

export default function ChangePasswordModal({
    changePasswordModalState,
    handleCloseChangePasswordModal
}){

    const {
        handleSubmit: handleSubmitCheck,
        register: registerCheck
    } = useForm()

    const {
        handleSubmit: handleSubmitUpdate
    } = useForm()

    const { user } = useAuth()
    const [ userCanChange, setUserCanChange ] = useState(false)
    const [ userCheckIsLoading, setUserCheckIsLoading ] = useState(false)
    const [ userUpdateIsLoading, setUserUpdateIsLoading ] = useState(false)

    const checkUser = async (data) => {
        try{
            setUserCheckIsLoading(true)
            const _user = new FormData()
            _user.append("_id", user._id)
            _user.append("checkPassword", data.password)
            await api.post("/user/check", { user: formToJSON(_user) })
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
        finally{
            setUserCheckIsLoading(false)
        }
    }

    const changeUserPassword = async (data) => {

        try{

            if(userCanChange){

                let _user = user._id
                const update = new FormData()
                
                if(data.newPassword !== data.confirmNewPassword)
                    return toast.warning("Le nouveau mot de passe et la confirmation de nouveau mot de passe doivent correspondre.")

            }

        }
        catch{}
        finally{}

    }

    return(
        <section className={ changePasswordModalState ? "change-password-modal enabled" : "change-password-modal"}>
            <h3>Changement de mot de passe :</h3>
            <p>Afin de pouvoir modifier votre mot de passe, vous devez vous identifier.</p>
            <p>Suite au changement de votre mot de passe, vous serez déconnecté de votre compte puis vous authentifier à nouveau pour vous connecter.</p>
            {
                !userCanChange &&
                <form onSubmit={handleSubmitCheck(checkUser)}>
                    <div className="form-element">
                        <label htmlFor="checkPassword">Votre mot de passe actuel :</label>
                        <input type="password" id="checkPassword" { ...registerCheck("checkPassword") } placeholder="veuillez saisir votre mot de passe actuel" required />
                    </div>
                    <div className="form-element">
                        <span className="border">
                            <button>
                                {
                                    userCheckIsLoading ?
                                    <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                                    : "Soumettre"
                                }
                            </button>
                        </span>
                    </div>
                </form>
            }
            {
                userCanChange &&
                <form>

                </form>
            }
        </section>
    )
}