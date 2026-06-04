import Sidebar from "../dashboard/aside";
import IsAuthenticated from "../isAuthenticated";

export default function DashboardLayout({children}){
    return(
        <IsAuthenticated>
            <section className="dashboard-layout">
                <Sidebar/>
                {children}
            </section>
        </IsAuthenticated>
    )
}