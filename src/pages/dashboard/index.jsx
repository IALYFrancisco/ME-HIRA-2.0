import DashboardLayout from "@/components/layouts/dashboardLayout";
import SongsList from "@/components/dashboard/songs/songs-list";

export default function Song(){
    return(
        <DashboardLayout>
            <SongsList/>
        </DashboardLayout>
    )
}