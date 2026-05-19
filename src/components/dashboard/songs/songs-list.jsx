import Image from "next/image"

export default function SongsList(){
    return(
        <section className="dashboard-songs-container">
            <section className="header">
                <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                <h1>Chansons</h1>
            </section>
        </section>
    )
}