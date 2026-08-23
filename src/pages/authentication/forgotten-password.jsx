/* eslint-disable react/no-unescaped-entities */
import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useForm } from "react-hook-form"
import IsNotAuthenticated from "@/components/isNotAuthenticated"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { api } from "@/helpers/api"

export default function ForgottenPassword(){

    const { register, handleSubmit } = useForm()
    const { loading } = useAuth()
    var [ sendLinkToResetPasswordIsLoading, setSendLinkToResetPasswordIsLoading ] = useState(false)

    const sendLinkToResetPassword = async (data)=>{
        try{
            setSendLinkToResetPasswordIsLoading(true)
            await api.post("/user/forgotten-password", { email: data.email })
            toast.info("Un email vous permettant de réinitialiser votre mot de passe a été envoyé à l'adresse email que vous avez fourni.")
        }
        catch{
            toast.error("Erreur de tenative de réinitialisation de mot de passe, veuillez réessayer plus tard.")
        }
        finally{
            setSendLinkToResetPasswordIsLoading(false)
        }
    }

    return(
        <IsNotAuthenticated>
            <Head>
                <title>Mot de passe oublié | Me-Hira</title>
            </Head>
            <section className="forgotten-password-container">
                <Navbar/>
                <form onSubmit={handleSubmit(sendLinkToResetPassword)}>
                    <p>Nous enverrons à l'adresse email que vous avez fourni un message vous permettant de réinitialiser votre mot de passe.</p>
                    <div className="form-element">
                        <label htmlFor="email">Adresse email associé à votre compte Me-Hira :</label>
                        <input type="email" id="email" placeholder="ex: name@exemple.com" { ...register('email', { required: true }) } required disabled={loading || sendLinkToResetPasswordIsLoading}/>
                    </div>
                    <div className="form-element">
                        <span className={(loading || sendLinkToResetPasswordIsLoading)?"border disabled":"border"}>
                            <button disabled={loading || sendLinkToResetPasswordIsLoading}>
                                {(loading || sendLinkToResetPasswordIsLoading) ? <Image src="/images/black-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> : "Envoyer le lien"}
                            </button>
                        </span>
                    </div>
                </form>
                <Footer/>
            </section>
        </IsNotAuthenticated>
    )
}