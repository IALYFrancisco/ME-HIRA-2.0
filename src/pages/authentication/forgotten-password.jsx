import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useForm } from "react-hook-form"
import IsNotAuthenticated from "@/components/isNotAuthenticated"

export default function ForgottenPassword(){

    const { register, handleSubmit } = useForm()

    const sendLinkToResetPassword = ()=>{

    }

    return(
        <IsNotAuthenticated>
            <Head>
                <title>Mot de passe oublié | Me-Hira</title>
            </Head>
            <section className="forgotten-password-container">
                <Navbar/>
                <form onSubmit={handleSubmit(sendLinkToResetPassword)}>
                    <p>Nous vous enverrons à votre email un lien vous redirigeant sur la page de changement de mot de passe.</p>
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
        </IsNotAuthenticated>
    )
}