import Image from "next/image"

export default function SongsList(){
    return(
        <section className="dashboard-songs-container">
            <section className="header">
                <div className="page-title">
                    <Image src="/images/logo-de-me-hira.png" priority width={94} height={94} alt="logo de me-hira" className="logo-de-me-hira" />
                    <h1>Chansons</h1>
                </div>
                <div className="actions-container">
                    <div className="filters-container">
                        <input type="text" name="" id="" placeholder="Rechercher des chansons ..." />
                    </div>
                    <span>
                        <button>Ajouter une chanson</button>
                    </span>
                </div>
            </section>
        </section>
    )
}