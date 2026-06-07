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
    (response) => {

        const at_sid = response.data?.at_sid;
        if (at_sid) {
            localStorage.setItem("at.sid", at_sid);
        }

        return response;
    },

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 209 &&
            !originalRequest._retry &&
            originalRequest.url !== "/authentication/refresh-token"
        ) {

            originalRequest._retry = true;

            try {

                const refreshResponse = await api.post("/authentication/refresh-token");

                const newToken = refreshResponse.data.at_sid;
                localStorage.setItem("at.sid", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);

            } catch (err) {

                localStorage.removeItem("at.sid");
                // setUser(null) via logout handler

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);