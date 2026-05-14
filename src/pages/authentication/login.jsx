import Head from "next/head"
import Navbar from "@/components/navbar"

export default function Login(){
    return(
        <>
            <Head>
                <title>Connexion à un compte Me-Hira</title>
            </Head>
            <section className="login-page-container">
                <Navbar/>   
            </section>
        </>
    )
}