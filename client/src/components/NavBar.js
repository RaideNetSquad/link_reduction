import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const NavBar = () => {
    const auth = useContext(AuthContext);
    const exitHandler = (e) => {
        e.preventDefault();
        auth.logout();
        //редирект (в конец истории массива)
        window.location.reload();
    }
    return(
        <nav>
            <div className="nav-wrapper blue darken-1" style={{'padding': '0 2rem'}}>
            <span className="brand-logo">Сокращение ссылок</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Создать</NavLink></li>
                <li><NavLink to="/links">Список</NavLink></li>
                <li><a href="/" onClick={exitHandler}>Выход</a></li>
            </ul>
            </div>
        </nav>
    )
}