import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    const at_sid = localStorage.getItem("at.sid")
    if(at_sid){
        config.headers.Authorization = `Bearer ${at_sid}`
    }
    return config
})

api.interceptors.response.use((response)=>{
    const at_sid = response.data?.at_sid
    if(at_sid){
        localStorage.setItem("at.sid", at_sid)
    }
    return response
}, (error)=>Promise.reject(error))