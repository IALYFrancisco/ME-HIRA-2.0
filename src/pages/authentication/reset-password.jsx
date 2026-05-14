import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useForm } from "react-hook-form"

export default function ResetPassword(){

    const { handleSubmit, register } = useForm()

    const resetPassword = ()=>{

    }

    return(
        <>
            <Head>
                <title>Réinitialisation de mot de passe</title>
            </Head>
            <section className="reset-password-container">
                <Navbar/>
                    <form onSubmit={handleSubmit(resetPassword)}>
                        <p>Ceci est la page de réinitialisation de mot de passe, choisissez un nouveau mot de passe et confirmez-le ensuite.</p>
                        <div className="form-element">
                            <label htmlFor="email">Adresse email :</label>
                            <input type="email" id="email" placeholder="ex: name@exemple.com" { ...register('email', { required: true }) } required />
                        </div>
                        <div className="form-element">
                            <span className="border">
                                <button>Envoyer le lien</button>
                            </span>
                        </div>
                    </form>
                <Footer/>
            </section>
        </>
    )
}