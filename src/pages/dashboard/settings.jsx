import DashboardLayout from "@/components/layouts/dashboardLayout";
import Head from "next/head";
import Link from "next/link";

export default function Settings(){
    return(
        <DashboardLayout>
            <Head>
                <title>
                    Paramètres - Me-Hira
                </title>
            </Head>
            <section className="dashboard-settings-container">
                <div className="page-header-container">
                    <section className="header">
                        <div className="page-title">
                            <Link></Link>
                        </div>
                    </section>
                </div>
            </section>
        </DashboardLayout>
    )
}