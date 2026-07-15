export default function Overlay(props, {onClickAction}) {
    return(<div className={ props.overlayState ? "overlay enabled" : "overlay"} onClick={onClickAction}></div>)
}