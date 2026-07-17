export default function PersonalInfosEditingModal({personalInfosEditingModalState}){
    return(
        <section className={ personalInfosEditingModalState ? "change-personal-infos-modal enabled" : "change-personal-infos-modal"}>
            <h3>Changement sur les informations personnelles :</h3>
        </section>
    )
}