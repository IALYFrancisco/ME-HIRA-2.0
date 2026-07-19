import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/helpers/api"
import { formToJSON } from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"

export default function PersonalInfosEditingModal({
    personalInfosEditingModalState,
    handleCloseChangePersonalInfosModal
}){

    const { 
        register: registerUpdate,
        handleSubmit: handleSubmitUpdate,
        reset: resetUpdate,
        formState: { isDirty: isDirtyUpdateForm }
    } = useForm()

    const {
        reset: resetCheck,
        handleSubmit: handleSubmitCheck,
        register: registerCheck
    } = useForm()

    const { user, setUser } = useAuth()
    const [ userCanChange, setUserCanChange ] = useState(false)
    const [ userCkeckIsLoading, setUserCheckIsLoading ] = useState(false)
    const [ userUpdateIsLoading, setUserUpdateIsLoading ] = useState(false)

    const checkUser = async (data) => {
        try{
            setUserCheckIsLoading(true)
            const _user = new FormData()
            _user.append("_id", user._id)
            _user.append("password", data.password)
            await api.post("/user/check", { user: formToJSON(_user) })
            resetUpdate({
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

    const changeUserPersonalInfos = async (data) => {
        try{
            setUserUpdateIsLoading(true)
            if(userCanChange){
                
                let _user = user._id
                const update = new FormData()
                if(data.name !== user.name){
                    update.append("name", data.name)
                }
                if(data.email !== user.email){
                    update.append("email", data.email)
                }

                await api.patch("/user/update", { user: _user, update: formToJSON(update) })

                if(update.email){
                    setTimeout(()=>{
                        localStorage.removeItem("at.sid")
                        setUser(null)
                    }, 4000)
                    handleClickCancelButton()
                    return toast.info("Vos informations a été bien modifiées et puisque votre adresse email a réçu une modfication, vous allez être déconnecté.")
                }
                const getUserInformationsResponse = await api.get("/user/informations")
                setUser(getUserInformationsResponse.data)
                handleClickCancelButton()
                return toast.info("Vos informations a été bien modifiées.")

            }
            return toast.warning("Vous n'êtes pas autorisé à faire cette action.")
        }
        catch{
            return toast.error("Erreur de modification des informations personnelles, veuillez réessayer plus tard.")
        }
        finally{
            setUserUpdateIsLoading(false)
        }
    }

    const handleClickCancelButton = () => {
        handleCloseChangePersonalInfosModal()
        resetCheck([{
            password: ""
        }])
        resetUpdate({
            name: "",
            email: ""
        })
        setUserCanChange(false)
    }

    return(
        <section className={ personalInfosEditingModalState ? "change-personal-infos-modal enabled" : "change-personal-infos-modal"}>
            <h3>Changement sur les informations personnelles :</h3>
            <p>Afin de pouvoir modifier vos informations personnelles, vous devez vous identifier.</p>
            <p>Si votre adresse email reçoit une modification, vous serez déconnecté de votre compte puis vous authentifier à nouveau pour vous connecter.</p>
            { !userCanChange &&
                <form onSubmit={handleSubmitCheck(checkUser)}>
                    <div className="form-element">
                        <label htmlFor="password">Votre mot de passe :</label>
                        <input type="password" id="password" { ...registerCheck("password") } placeholder="veuillez saisir votre mot de passe" required />
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
                <form onSubmit={handleSubmitUpdate(changeUserPersonalInfos)} className="can-change-form">
                    <div className="form-element">
                        <label htmlFor="name">Votre nom :</label>
                        <input type="text" id="name" placeholder="on vous sollicite de nous fournir votre nom complet" { ...registerUpdate("name",{required:true}) } required />
                    </div>
                    <div className="form-element">
                        <label htmlFor="email">Votre adresse email :</label>
                        <input type="email" id="email" placeholder="on vous sollicite de nous fournir votre nom complet" { ...registerUpdate("email",{required:true}) } required />
                    </div>
                    <div className="form-element">
                        <span className="border" onClick={handleClickCancelButton}>
                            <button>Annuler</button>
                        </span>
                        <span className="border">
                            <button disabled={!isDirtyUpdateForm}>
                                { 
                                    userUpdateIsLoading ?
                                    <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                                    : "Soumettre"
                                }
                            </button>
                        </span>
                    </div>
                </form>
            }
            <span className="close-modal" onClick={ ()=> {closeAddSongModal(); reset()}}>
                <Image src="/images/close.png" width={16} height={16} priority alt="fermer modal d'ajout de chanson"/>
            </span>
        </section>
    )
}