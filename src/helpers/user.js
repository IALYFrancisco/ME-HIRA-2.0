import { api } from "./api"

export async function GetUserInformations(){
    try{
        const response = await api.get('/user/informations')
        if(response.status===200) return response.data
        if(response.status===209) return null
    }
    catch{
        return null
    }
}