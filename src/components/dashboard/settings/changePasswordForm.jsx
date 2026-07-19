import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function ChangePasswordForm(){

    const { reset, register } = useForm()
    const [ overlayState, setOverlayState ] = useState(false)

    useEffect(()=>{
        reset({
            password: "****************************"
        })
    },[reset])

    return(
        <form>
            <h2>Mot de passe :</h2>
            <div className="form-element">
                <label htmlFor="password">Votre mot de passe actuel :</label>
                <input type="password" id="password" { ...register("password", {required:true}) } required placeholder="veuillez choisir un mot de passe fort" />
            </div>
            <div className="form-element">
                <span className="border">
                    <button>Changer mon mot de passe</button>
                </span>
            </div>
        </form>
    )
}