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

api.interceptors.response.use(
    async (response) => {

        const at_sid = response.data?.at_sid;

        if (at_sid) {
            localStorage.setItem("at.sid", at_sid);
        }

        if (response.status === 209 && response.config.url !== "/authentication/refresh-token") {

            const originalRequest = response.config;

            if (!originalRequest._retry) {

                originalRequest._retry = true;

                try {

                    const refreshResponse = await api.post("/authentication/refresh-token");

                    if(refreshResponse.status === 200){

                        const newToken = refreshResponse.data.at_sid;
    
                        localStorage.setItem("at.sid", newToken);
    
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
    
                        return api(originalRequest);
                        
                    }


                } catch (err) {

                    localStorage.removeItem("at.sid");

                    return Promise.reject(err);
                }
            }
        }

        return response;
    },

    (error) => {
        return Promise.reject(error);
    }
);