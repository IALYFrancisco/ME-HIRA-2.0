import Sidebar from "../dashboard/aside";
import IsAuthenticated from "../isAuthenticated";
import { ThemeProvider } from "next-themes";
import Head from "next/head"

export default function DashboardLayout({children}){
    return(
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="me-hira-color-mode"
        >
            <Head>
                <meta name="robots" content="noindex, nofollow" key="robots" />
            </Head>
            <IsAuthenticated>
                <section className="dashboard-layout">
                    <Sidebar/>
                    {children}
                </section>
            </IsAuthenticated>
        </ThemeProvider>
    )
}