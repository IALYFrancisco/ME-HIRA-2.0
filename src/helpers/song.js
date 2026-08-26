export function JoinArrayItems(array){
    return array.join(", ")
}

export function FormatSongDuration(duration){

    if(!Number.isFinite(duration) || duration < 0){
        return "0 : 00"
    }

    const totalSeconds = Math.floor(duration)

    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60

    if(hours > 0){
        return `${hours} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
    }

    return `${minutes} : ${seconds.toString().padStart(2, "0")}`
}