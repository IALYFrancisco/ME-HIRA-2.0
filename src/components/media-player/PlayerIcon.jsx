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

        case "pause" :
            return(
                <svg { ...commonProps }>
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
            )

        case "previous":
            return(
                <svg { ...commonProps }>
                    <polygon points="19 5 9 12 19 19 19 5" />
                    <line x1="5" y1="5" x2="5" y2="19" />
                </svg>
            )

    }

}