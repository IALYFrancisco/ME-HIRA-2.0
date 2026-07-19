import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { formToJSON } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ChangePasswordModal({
    changePasswordModalState,
    handleCloseChangePasswordModal
}){

    const {
        handleSubmit: handleSubmitCheck
    } = useForm()

    const { user } = useAuth()
    const [ userCanChange, setUserCanChange ] = useState(false)
    const [ userCheckIsLoading, setUserCheckIsLoading ] = useState(false)

    const checkUser = async (data) => {
        try{
            setUserCheckIsLoading(true)
            const _user = new FormData()
            _user.append("_id", user._id)
            _user.append("checkPassword", data.password)
            await api.post("/user/check", { user: formToJSON(_user) })
            setUserCanChange(true)
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
                <form></form>
            }
        </section>
    )
}