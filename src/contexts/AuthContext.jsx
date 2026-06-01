import { createContext, useState, useEffect, useContext } from "react"
import { api } from "@/helpers/api"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        api.get('/user/informations')
            .then((response)=>{
                if(response.status === 200){
                    setUser(response.data)
                }
            })
            .finally(()=>setLoading(false))
    }, [])
    return(
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)