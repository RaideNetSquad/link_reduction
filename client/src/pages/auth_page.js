
import React, { useState, useEffect, useContext } from 'react';
const {useHttp} = require('../hooks/http.hook');
const {useMessage} = require('../hooks/message.hook');
const {AuthContext} = require('../context/AuthContext');

export const AuthPage = () => {
    const {login} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const message = useMessage();
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]) //if error has been updated, then will update component

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const [form, setForm] = useState({
        email: '', password: ''
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name] : event.target.value});
    }
    //обработчик кнопки регистрации
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            console.log("Data " + data);
        } catch (error) {}
        
    }
    //обработчик кнопки авторизации
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            login(data.token, data.userId);
            console.log("Data " + data.token);
        } catch (error) {}
        
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card red darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        
                        <div className="input-field">
                            <input 
                                placeholder="Введите Еmail" 
                                id="email" 
                                type="text" 
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input 
                                placeholder="Введите Пароль" 
                                id="password" 
                                type="password" 
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Пароль</label>
                        </div>

                    </div>
                    <div className="card-action">
                        <div>
                            <button 
                                className="btn yellow darken-4"
                                onClick={loginHandler}
                                disabled={loading}
                            >Войти</button>
                            <button 
                                className="btn deep-purple darken-3" 
                                onClick={registerHandler} 
                                disabled={loading}
                            >Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}