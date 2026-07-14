export default function Overlay(props) {
    return(<div className={ props.overlayState ? "overlay actif" : "overlay"}></div>)
}