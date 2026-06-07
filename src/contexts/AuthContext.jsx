import { createContext, useState, useEffect, useContext } from "react"
import { api } from "@/helpers/api"
import { setLogoutHandler } from "@/helpers/authentication"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLogoutHandler(() => {
            setUser(null)
            setLoading(false)
            localStorage.removeItem("at.sid")
        })
    }, [])

    useEffect(() => {
        api.get('/user/informations')
            .then(response => setUser(response.data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)