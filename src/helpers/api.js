import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if(error.response.status == 401 && !originalRequest._retry){
            originalRequest._retry = true
            const response = await api.post("/authentication/refresh-token")
            const accessToken = response.data.accessToken
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
        }
        return Promise.reject(error)
    }
)