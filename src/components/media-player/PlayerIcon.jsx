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

        case "previous" :
            return(
                <svg { ...commonProps }>
                    <polygon points="19 5 9 12 19 19 19 5" />
                    <line x1="5" y1="5" x2="5" y2="19" />
                </svg>
            )

        case "next" :
            return(
                <svg { ...commonProps }>
                    <polygon points="5 5 15 12 5 19 5 5" />
                    <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
            )

        case "volume":
            return (
                <svg {...commonProps}>
                    <polygon points="3 9 7 9 12 5 12 19 7 15 3 15 3 9" />
                    <path d="M16 8.5a5 5 0 0 1 0 7" />
                    <path d="M19 5.5a9 9 0 0 1 0 13" />
                </svg>
            );

        case "mute":
            return (
                <svg {...commonProps}>
                    <polygon points="3 9 7 9 12 5 12 19 7 15 3 15 3 9" />
                    <line x1="17" y1="9" x2="22" y2="15" />
                    <line x1="22" y1="9" x2="17" y2="15" />
                </svg>
            );

        case "fullscreen":
            return (
                <svg {...commonProps}>
                    <polyline points="8 3 3 3 3 8" />
                    <polyline points="16 3 21 3 21 8" />
                    <polyline points="21 16 21 21 16 21" />
                    <polyline points="3 16 3 21 8 21" />
                </svg>
            );

    }

}