import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function ChangePasswordForm(){

    const { reset, register, handleSubmit } = useForm()
    const [ overlayState, setOverlayState ] = useState(false)
    const [ changePasswordModalState, setChangePasswordModalState ] = useState(false)

    useEffect(()=>{
        reset({
            password: "****************************"
        })
    },[reset])

    const handleSubmitForm = ()=>{
        return
    }

    const handleOpenChangePasswordModal = () => {
        setOverlayState(true)
        setChangePasswordModalState(true)
    }

    const handleCloseChangePasswordModal = () => {
        setChangePasswordModalState(false)
        setOverlayState(false)
    }

    return(
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h2>Mot de passe :</h2>
            <div className="form-element">
                <label htmlFor="password">Votre mot de passe actuel :</label>
                <input disabled type="password" id="password" { ...register("password", {required:true}) } required placeholder="veuillez choisir un mot de passe fort" />
            </div>
            <div className="form-element">
                <span className="border">
                    <button>Changer mon mot de passe</button>
                </span>
            </div>
        </form>
    )
}