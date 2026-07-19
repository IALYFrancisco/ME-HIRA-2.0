import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ChangePasswordModal({
    changePasswordModalState,
    handleCloseChangePasswordModal
}){

    const {
        handleSubmit: handleSubmitCheck
    } = useForm()

    const [ userCanChange, setUserCanChange ] = useState(false)

    const checkUser = async (data) => {
        try{}
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