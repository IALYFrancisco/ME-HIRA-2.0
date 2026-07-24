import Sidebar from "../dashboard/aside";
import IsAuthenticated from "../isAuthenticated";
import { ThemeProvider } from "next-themes";

export default function DashboardLayout({children}){
    return(
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="me-hira-color-mode"
        >
            <IsAuthenticated>
                <section className="dashboard-layout">
                    <Sidebar/>
                    {children}
                </section>
            </IsAuthenticated>
        </ThemeProvider>
    )
}