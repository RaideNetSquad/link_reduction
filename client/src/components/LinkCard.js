import React from 'react';

export const LinkCard = ({link}) => {
    console.log(link);
    return (
        <>
            <h2>Ссылка</h2>

            <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.number}</strong></p>
            <p>Дата создания: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
        </>
    )
}