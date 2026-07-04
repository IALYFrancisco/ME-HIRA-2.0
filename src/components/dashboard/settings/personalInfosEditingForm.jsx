import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function PersonalInfosEditingForm(){

    const { register, reset } = useForm()
    const { user } = useAuth()

    useEffect(()=>{
        reset({
            name: user.name,
            email: user.email
        })
    },[user])

    return(
        <form>
            <h2>Informations personnelles :</h2>
            <div className="form-element">
                <label htmlFor="name">Votre nom :</label>
                <input disabled={true} type="text" id="name" placeholder="veuillez saisir votre nom complet" { ...register("name", { required: true }) } required/>
            </div>
            <div className="form-element">
                <label htmlFor="email">Votre email :</label>
                <input disabled={true} type="email" id="email" placeholder="veuillez saisir votre adresse email" { ...register("email", { required: true }) } required/>
            </div>
        </form>
    )
}