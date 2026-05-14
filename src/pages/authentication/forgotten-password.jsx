import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ForgottenPassword(){
    return(
        <>
            <Head>
                <title>Mot de passe oublié | Me-Hira</title>
            </Head>
            <section className="forgotten-password-container">
                <Navbar/>
                <Footer/>
            </section>
        </>
    )
}