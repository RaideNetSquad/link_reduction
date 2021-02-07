import React, { useCallback, useContext, useEffect, useState } from 'react';
import { LinksList } from '../components/LinksList';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const LinksPage = () => {
    //all links user
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();

    const {token} = useContext(AuthContext);

    const fecthLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Autherization: `Beares ${token}`
            });
            setLinks(fetched);
        } catch (error) {}
    }, [])

    useEffect(() => {
        fecthLinks()
    }, [fecthLinks]);

    if(loading) {
        return <Loader/>
    }

    return(
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
};