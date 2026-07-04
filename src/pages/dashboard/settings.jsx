import DashboardLayout from "@/components/layouts/dashboardLayout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

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
                            <Link href="/">
                                <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                            </Link>
                            <h1>Paramètres</h1>
                        </div>
                        <p>Vous pouvez changer vos préféreces selon les formulaires suivants :</p>
                    </section>
                </div>
            </section>
        </DashboardLayout>
    )
}