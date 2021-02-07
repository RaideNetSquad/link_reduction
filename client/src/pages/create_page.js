import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';

import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const {request} = useHttp();
    const [Link, setLink] = useState();
    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const pressHandler = async e => {
        if(e.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: Link}, {
                    Autherization: `Bearer ${auth.token}` 
                });
                console.log(data);
                history.push(`/link/${data.link._id}`);
                
            } catch (error) {
                
            }
        }
    }
    //create link user
    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        placeholder="Вставьте ссылку" 
                        id="link" 
                        type="text" 
                        name="link"
                        value={Link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Ссылка</label>
                </div>                
            </div>
        </div>
    )
};