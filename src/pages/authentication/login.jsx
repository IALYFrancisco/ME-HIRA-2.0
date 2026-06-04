import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { api } from "@/helpers/api"
import { toast } from "sonner"
import IsNotAuthenticated from "@/components/isNotAuthenticated"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import Image from "next/image"

export default function Login(){

    const { register, handleSubmit } = useForm()
    const { setUser, loading } = useAuth()
    var [loginIsLoading, setLoginIsLoading] = useState(false)

    const login = async (data)=>{
        try{
            setLoginIsLoading(true)
            let user = {
                email: data.email,
                password: data.password
            }
            await api.post('/authentication/login', user)
            let response = await api.get('/user/informations')
            setUser(response.data)
        }catch(error){
            if(error.status === 401){
                return toast.error("Email ou mot de passe incorrecte.")
            }
            toast.error("Erreur de connexion, veuillez réessayer plus tard.")
        }
        finally{
            setLoginIsLoading(false)
        }
        
    }

    return(
        <IsNotAuthenticated>
            <Head>
                <title>Connexion à un compte Me-Hira</title>
            </Head>
            <section className="login-page-container">
                <Navbar/>
                <form onSubmit={handleSubmit(login)}>
                    <div className="form-element">
                        <label htmlFor="email">Adresse email :</label>
                        <input type="email" id="email" placeholder="ex: name@exemple.com" { ...register('email', { required: true }) } required  disabled={loading || loginIsLoading}/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" placeholder="choisissez un mot de passe fort" { ...register('password', { required: true }) } required  disabled={loading || loginIsLoading}/>
                    </div>
                    <Link href="/authentication/forgotten-password">Mot de passe oublié ?</Link>
                    <div className="form-element">
                        <span className={(loading || loginIsLoading)?"border disabled":"border"}>
                            <button disabled={loading || loginIsLoading}>
                                {(loading || loginIsLoading) ? <Image src="/images/black-dots-loader.svg" width={100} height={20} priority alt="buttons loader"/> : "Connexion"}
                            </button>
                        </span>
                    </div>
                </form>
                <Footer/>   
            </section>
        </IsNotAuthenticated>
    )
}