import { useState } from "react";

const useHttp = () => {
    const [isLoadding , setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (requestConfig) =>{
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(
                requestConfig.url, requestConfig.options
            )

            if(!res.ok){
                throw new Error('Request failed');
            }

            const data = await res.json();
            setIsLoading(false);
            return data;
   
        } catch (err) {
            setError(err.message || 'Somthing went wrong!');
            setIsLoading(false);
        }
    }

    return {
        isLoadding , 
        error,
        sendRequest
    }
}

export default useHttp;