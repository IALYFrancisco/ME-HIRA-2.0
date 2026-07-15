/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"

export default function RemoveArtistDocumentModal({ 
    removeArtistDocumentState,
    documentToDoAction,
    handleClickNoButton,
    songActionIsLoading,
    removeDocumentArtist
}){
    return(
        <div className={ removeArtistDocumentState ? "remove-document-modal enabled" : "remove-document-modal" }>
            <h3>Suppression d'un document artiste.</h3>
            { documentToDoAction &&
                <>
                    <p>
                        Êtes-vous sûr(e) de vouloir supprimer les documents artiste de
                        <strong> {documentToDoAction.artistName} </strong>
                        ?
                    </p>
                    <p>Faite attention, cette action est irréversible.</p>
                </>
            }
            <div className="remove-document-choices">
                <span onClick={handleClickNoButton}><button disabled={songActionIsLoading} className="no">Non</button></span>
                <span>
                    <button disabled={songActionIsLoading} onClick={()=>removeDocumentArtist(documentToDoAction)} className="yes">
                        { 
                            songActionIsLoading ?
                            <Image src="/images/spinner.svg" priority alt="chargement recherche des chansons selon leur titre et chanteurs" width={48} height={48} className="loader-search-icone" />
                            : "Oui"
                        }
                    </button>
                </span>
            </div>
        </div>
    )
}