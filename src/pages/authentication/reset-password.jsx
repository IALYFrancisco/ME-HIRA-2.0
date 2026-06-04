import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useForm } from "react-hook-form"
import IsNotAuthenticated from "@/components/isNotAuthenticated"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"

export default function ResetPassword(){

    const { handleSubmit, register } = useForm()
    const { loading } = useAuth()
    var [resetPasswordLoading, setResetPasswordLoading] = useState(false)

    const resetPassword = async (data)=>{
        try{
            setResetPasswordLoading(true)
            if(data.newPassword !== data.password){
                return toast.warning("Le mot de passe des deux champs doivent se correspondre.")
            }
        }
        finally{
            setResetPasswordLoading(false)
        }
    }

    return(
        <IsNotAuthenticated>
            <Head>
                <title>Réinitialisation de mot de passe</title>
            </Head>
            <section className="reset-password-container">
                <Navbar/>
                    <form onSubmit={handleSubmit(resetPassword)}>
                        <p>Ceci est la page de réinitialisation de mot de passe, choisissez un nouveau mot de passe et confirmez-le ensuite.</p>
                        <div className="form-element">
                            <label htmlFor="newPassword">Nouveau mot de passe :</label>
                            <input type="password" id="newPassword" placeholder="Choisissez un mot de passe fort" { ...register('newPassword', { required: true }) } required disabled={loading || resetPasswordLoading}/>
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Confirmez le nouveau mot de passe :</label>
                            <input type="password" id="password" placeholder="Le même mot de passe que le dessus" { ...register('password', { required: true }) } required disabled={loading || resetPasswordLoading}/>
                        </div>
                        <div className="form-element">
                            <span className={(loading || resetPasswordLoading)?"border disabled":"border"}>
                                <button disabled={loading || resetPasswordLoading}>
                                    {(loading || resetPasswordLoading) ? <Image src="/images/black-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> : "Soumettre"}
                                </button>
                            </span>
                        </div>
                    </form>
                <Footer/>
            </section>
        </IsNotAuthenticated>
    )
}