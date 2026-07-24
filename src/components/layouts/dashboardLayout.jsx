import Sidebar from "../dashboard/aside";
import IsAuthenticated from "../isAuthenticated";
import { ThemeProvider } from "next-themes";

export default function DashboardLayout({children}){
    return(
        <ThemeProvider>
            <IsAuthenticated>
                <section className="dashboard-layout">
                    <Sidebar/>
                    {children}
                </section>
            </IsAuthenticated>
        </ThemeProvider>
    )
}