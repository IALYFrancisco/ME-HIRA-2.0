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

        case "fullscreenExit":
            return (
                <svg {...commonProps}>
                    <polyline points="9 3 9 9 3 9" />
                    <polyline points="15 3 15 9 21 9" />
                    <polyline points="21 15 15 15 15 21" />
                    <polyline points="3 15 9 15 9 21" />
                </svg>
            );

        case "settings":
            return (
                <svg {...commonProps}>
                    <path d="
                        M19.43 12.98
                        c.04-.32.07-.65.07-.98
                        s-.02-.66-.07-.98
                        l2.11-1.65
                        c.19-.15.24-.42.12-.64
                        l-2-3.46
                        c-.12-.22-.37-.31-.6-.22
                        l-2.49 1
                        c-.52-.4-1.08-.73-1.69-.98
                        L14.5 2.42
                        C14.47 2.18 14.25 2 14 2
                        h-4
                        c-.25 0-.46.18-.5.42
                        L9.12 5.07
                        c-.61.25-1.18.58-1.69.98
                        l-2.49-1
                        c-.23-.09-.48 0-.6.22
                        l-2 3.46
                        c-.12.22-.07.49.12.64
                        l2.11 1.65
                        c-.04.32-.07.65-.07.98
                        s.02.66.07.98
                        l-2.11 1.65
                        c-.19.15-.24.42-.12.64
                        l2 3.46
                        c.12.22.37.31.6.22
                        l2.49-1
                        c.52.4 1.08.73 1.69.98
                        l.38 2.65
                        c.04.24.25.42.5.42
                        h4
                        c.25 0 .46-.18.5-.42
                        l.38-2.65
                        c.61-.25 1.18-.58 1.69-.98
                        l2.49 1
                        c.23.09.48 0 .6-.22
                        l2-3.46
                        c.12-.22.07-.49-.12-.64
                        l-2.11-1.65z
                    " />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );

        case "pip":
            return (
                <svg {...commonProps}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <rect x="12" y="12" width="7" height="5" rx="1" />
                </svg>
            );

        case "close":
            return (
                <svg {...commonProps}>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            );

        case "chevronRight":
            return (
                <svg {...commonProps}>
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            );

        case "chevronDown":
            return (
                <svg {...commonProps}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            );

        default:
            return null;

    }

}