export const isAuthenticatedToken = () => {
    return !!localStorage.getItem('token');
};

export const getToken = () => localStorage.getItem('token');

export const saveToken = (token: any) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};
