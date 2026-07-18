import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { formToJSON } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"

export default function PersonalInfosEditingModal({
    personalInfosEditingModalState,
    handleCloseChangePersonalInfosModal
}){

    const { register, handleSubmit, reset } = useForm()
    const { user } = useAuth()
    const [ userCanChange, setUserCanChange ] = useState(false)
    const [ userCkeckIsLoading, setUserCheckIsLoading ] = useState(false)

    const checkUser = async (data) => {
        try{
            setUserCheckIsLoading(true)
            const _user = new FormData()
            _user.append("_id", user._id)
            _user.append("password", data.password)
            await api.post("/user/check", { user: formToJSON(_user) })
            reset({
                name: user.name,
                email: user.email
            })
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

    const changeUserPersonalInfos = (data) => {
        try{
            if(userCanChange){
                
                let _user = user._id
                const update = new FormData()
                if(data.name !== user.name){
                    update.append("name", data.name)
                }

            }
            return toast.warning("Vous n'êtes pas autorisé à faire cette action.")
        }
        catch{}
    }

    const handleClickCancelButton = () => {
        handleCloseChangePersonalInfosModal()
        reset({
            name: "",
            email: "",
            password: ""
        })
        setUserCanChange(false)
    }

    return(
        <section className={ personalInfosEditingModalState ? "change-personal-infos-modal enabled" : "change-personal-infos-modal"}>
            <h3>Changement sur les informations personnelles :</h3>
            <p>Afin de pouvoir modifier vos informations personnelles, vous devez vous identifier.</p>
            <p>Si votre adresse email reçoit une modification, vous serez déconnecté de votre compte puis vous authentifier à nouveau pour vous connecter.</p>
            { !userCanChange &&
                <form onSubmit={handleSubmit(checkUser)}>
                    <div className="form-element">
                        <label htmlFor="password">Votre mot de passe :</label>
                        <input type="password" id="password" { ...register("password", {required:true}) } placeholder="veuillez saisir votre mot de passe" required />
                    </div>
                    <div className="form-element">
                        <span className="border">
                            <button>
                                { 
                                    userCkeckIsLoading ?
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
                <form onSubmit={handleSubmit(changeUserPersonalInfos)} className="can-change-form">
                    <div className="form-element">
                        <label htmlFor="name">Votre nom :</label>
                        <input type="text" id="name" placeholder="on vous sollicite de nous fournir votre nom complet" { ...register("name",{required:true}) } required />
                    </div>
                    <div className="form-element">
                        <label htmlFor="email">Votre adresse email :</label>
                        <input type="email" id="email" placeholder="on vous sollicite de nous fournir votre nom complet" { ...register("email",{required:true}) } required />
                    </div>
                    <div className="form-element">
                        <span className="border" onClick={handleClickCancelButton}>
                            <button>Annuler</button>
                        </span>
                        <span className="border">
                            <button>
                                { 
                                    userCkeckIsLoading ?
                                    <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                                    : "Soumettre"
                                }
                            </button>
                        </span>
                    </div>
                </form>
            }
        </section>
    )
}