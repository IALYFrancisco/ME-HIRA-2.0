export default function Overlay(props) {
    return(<div className={ props.overlayState ? "overlay enabled" : "overlay"} onClick={props.onClickAction}></div>)
}