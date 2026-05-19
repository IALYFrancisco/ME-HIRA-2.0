import DashboardLayout from "@/components/layouts/dashboardLayout";
import SongsList from "@/components/dashboard/songs/songs-list";
import Head from "next/head";

export default function Song(){
    return(
        <DashboardLayout>
            <Head>
                <title>Chansons - Me-Hira</title>
            </Head>
            <SongsList/>
        </DashboardLayout>
    )
}