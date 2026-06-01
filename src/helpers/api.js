import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    const tk_sid = localStorage.getItem("tk.sid")
    if(token){
        config.headers.Authorization = `Bearer ${tk_sid}`
    }
    return config
})

api.interceptors.response.use((response)=>{
    const tk_sid = response.data?.tk_sid
    if(tk_sid){
        localStorage.setItem("tk.sid")
    }
    return response
}, (error)=>Promise.reject(error))