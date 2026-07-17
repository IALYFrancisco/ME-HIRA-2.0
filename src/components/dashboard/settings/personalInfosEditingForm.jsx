import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import PersonalInfosEditingModal from "./personalInfosEditingModal";
import Overlay from "@/components/overlay";

export default function PersonalInfosEditingForm(){

    const { register, reset, handleSubmit } = useForm()
    const { user } = useAuth()
    const [ personalInfosEditingModalState, setPersonalInfosEditingModalState ] = useState(false)
    const [ overlayState, setOverlayState ] = useState(false)
    
    useEffect(()=>{
        reset({
            name: user.name,
            email: user.email
        })
    },[reset, user])

    const changeCurrentUserInfo = () => {
        return
    }

    const handleOpenChangePersonalInfosModal = () => {
        setOverlayState(true)
        setPersonalInfosEditingModalState(true)
    }

    return(
        <>
            <form onSubmit={handleSubmit(changeCurrentUserInfo)}>
                <h2>Informations personnelles :</h2>
                <div className="form-element">
                    <label htmlFor="name">Votre nom :</label>
                    <input disabled={true} type="text" id="name" placeholder="veuillez saisir votre nom complet" { ...register("name", { required: true }) } required/>
                </div>
                <div className="form-element">
                    <label htmlFor="email">Votre email :</label>
                    <input disabled={true} type="email" id="email" placeholder="veuillez saisir votre adresse email" { ...register("email", { required: true }) } required/>
                </div>
                <div className="form-element">
                    <span className="border" onClick={handleOpenChangePersonalInfosModal} >
                        <button>
                            {/* <Image src="/images/black-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> */}
                            Changer mon information personnelle
                        </button>
                    </span>
                </div>
            </form>
            <PersonalInfosEditingModal
                personalInfosEditingModalState={personalInfosEditingModalState}
            />
            <Overlay
                overlayState={overlayState}
            />
        </>
    )
}