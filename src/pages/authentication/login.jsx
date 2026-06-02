import Head from "next/head"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { api } from "@/helpers/api"
import { toast } from "sonner"
import IsNotAuthenticated from "@/components/isNotAuthenticated"
import { useAuth } from "@/contexts/AuthContext"

export default function Login(){

    const { register, handleSubmit } = useForm()
    const { setUser, loading } = useAuth()

    const login = async (data)=>{
        try{
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
                        <input type="email" id="email" placeholder="ex: name@exemple.com" { ...register('email', { required: true }) } required  disabled={loading}/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" placeholder="choisissez un mot de passe fort" { ...register('password', { required: true }) } required  disabled={loading}/>
                    </div>
                    <Link href="/authentication/forgotten-password">Mot de passe oublié ?</Link>
                    <div className="form-element">
                        <span className={loading?"border disabled":"border"}>
                            <button>Connexion</button>
                        </span>
                    </div>
                </form>
                <Footer/>   
            </section>
        </IsNotAuthenticated>
    )
}