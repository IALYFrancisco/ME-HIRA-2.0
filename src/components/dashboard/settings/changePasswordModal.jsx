export default function ChangePasswordModal({
    changePasswordModalState,
    handleCloseChangePasswordModal
}){
    return(
        <section className={ changePasswordModalState ? "change-password-modal enabled" : "change-password-modal"}></section>
    )
}