export function formatDateMG(dateInput){
    const date = new Date(dateInput)
    return new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Indian/Antananarivo",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date).replace(".", "")
}