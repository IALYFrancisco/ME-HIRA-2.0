export default function PlayerIcon({
    name,
    size = 20,
    strokeWidth = 2,
    className=""
}){

    const commonProps = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className
    }

    switch (name) {

        case "play" :
            return(
                <svg { ...commonProps }>
                    <polygon points="6 3 20 12 6 21 6 3"/>
                </svg>
            )

    }

}