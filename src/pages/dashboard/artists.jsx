import ArtistsList from "@/components/dashboard/artists/artists-list";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import Head from "next/head";

export default function Artist(){
    return(
        <DashboardLayout>
            <Head>
                <title>Artistes | Dashboard - Me-Hira</title>
            </Head>
            <ArtistsList/>
        </DashboardLayout>
    )
}