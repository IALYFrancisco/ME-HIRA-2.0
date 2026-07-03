import DashboardLayout from "@/components/layouts/dashboardLayout";
import Head from "next/head";

export default function Settings(){
    return(
        <DashboardLayout>
            <Head>
                <title>
                    Paramètres - Me-Hira
                </title>
            </Head>
            <section className="dashboard-settings-container"></section>
        </DashboardLayout>
    )
}