import { useAuth } from "@/contexts/AuthContext";
import { api } from "./api";

export function RefreshToken(request){
    const { setUser } = useAuth()
    api.post('/authentication/refresh-token')
    .then((response)=>{
        if(response.status === 209){
            api.post('/authentication/logout')
            .then(()=>{
                setUser(null)
                localStorage.removeItem("at.sid")
                return 
            })
        }
        if(response.status === 200){
            request
        }
    })
}