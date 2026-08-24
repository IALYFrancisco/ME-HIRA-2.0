//This component protect routes of authenticated users

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";

export default function IsNotAuthenticated({children}){
    const router = useRouter()
    const { user, loading } = useAuth()
    useEffect(()=>{
        if(!loading && user){
            router.replace("/dashboard")
        }
    }, [user, loading, router])
    return(
        <ThemeProvider
            attribute="class"
            forcedTheme="light"
        >
            {children}
        </ThemeProvider>
    )
}