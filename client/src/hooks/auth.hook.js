import {useCallback, useState, useEffect} from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem('UserData', JSON.stringify({
            token: jwtToken,
            userId: id
        }))
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem('UserData');
    }, []);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('UserData'));

        if(data && data.token)
        {
            login(data.token, data.userId)
        }
        setReady(true);
    }, [login]);

    return {login, logout, token, userId, ready};

}