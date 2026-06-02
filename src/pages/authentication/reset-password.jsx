import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useForm } from "react-hook-form"
import IsNotAuthenticated from "@/components/isNotAuthenticated"

export default function ResetPassword(){

    const { handleSubmit, register } = useForm()

    const resetPassword = ()=>{

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
                            <input type="password" id="newPassword" placeholder="Choisisez un mot de passe fort" { ...register('newPassword', { required: true }) } required />
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Confirmez le nouveau mot de passe :</label>
                            <input type="password" id="password" placeholder="Le même mot de passe que le dessus" { ...register('password', { required: true }) } required />
                        </div>
                        <div className="form-element">
                            <span className="border">
                                <button>Soumettre</button>
                            </span>
                        </div>
                    </form>
                <Footer/>
            </section>
        </IsNotAuthenticated>
    )
}