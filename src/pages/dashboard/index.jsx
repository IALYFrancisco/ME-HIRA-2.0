import DashboardLayout from "@/components/layouts/dashboardLayout";
import SongsList from "@/components/dashboard/songs/songs-list";
import Head from "next/head";

export default function Song(){
    return(
        <DashboardLayout>
            {/* <Head>
                <title>Chansons - Me-Hira</title>
            </Head>
            <SongsList/> */}
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos architecto facilis error rem, sapiente totam quibusdam ducimus, voluptate sint sunt vero beatae ea possimus enim officiis consequatur nihil, placeat et.</h1>
        </DashboardLayout>
    )
}