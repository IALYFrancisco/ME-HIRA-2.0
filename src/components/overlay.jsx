import { useState } from "react"

export default function Overlay() {

    const [ internOverlayState, setInternOverlayState ] = useState(false)

    return(<div className={  "overlay"}></div>)
}