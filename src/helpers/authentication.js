let logoutHandler = null;

export const setLogoutHandler = (handler) => {
    logoutHandler = handler;
};

export const logout = () => {
    if (logoutHandler) {
        logoutHandler();
    }
};