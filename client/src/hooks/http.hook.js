import { useCallback, useState } from "react"


export const useHttp = () => {
    console.log('useHttp')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //useCallback - для предотвращения рекурсии
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        
        setLoading(true);
        
        try {
            if(body){
                //изначально хук принимающий body - приводит его к строке
                //но мне нужна строка не объекта, а JSON
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});

            const data = await response.json();

            if(!response.ok)
            {
                throw new Error(data.message || "Что-то пошло не так");
            }
            
            setLoading(false);
            return data;

        } catch (error) {
            setLoading(false);
            setError(error.message);

            throw error;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}