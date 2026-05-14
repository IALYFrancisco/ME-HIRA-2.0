import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Login(){
    return(
        <>
            <Head>
                <title>Connexion à un compte Me-Hira</title>
            </Head>
            <section className="login-page-container">
                <Navbar/>
                <form>
                    <div className="form-element">
                        <label htmlFor="email">Adresse email :</label>
                        <input type="email" name="email" id="email" placeholder="ex: name@exemple.com" required />
                    </div>
                    <div className="form-element">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" placeholder="choisissez un mot de passe fort" required />
                    </div>
                </form>
                <Footer/>   
            </section>
        </>
    )
}