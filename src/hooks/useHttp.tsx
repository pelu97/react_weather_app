import { useState, useCallback } from "react";


interface RequestType{
    url: string,
    method?: string,
    headers?: {},
    body?: {}
}


export function useHttp(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(async function<DataType>(request: RequestType, setData: (data: DataType) => void) {
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(request.url, {
                method: request.method ? request.method : "GET",
                headers: request.headers ? request.headers: {},
                body: request.body ? JSON.stringify(request.body) : null
            });

            if(!response.ok){
                throw new Error("Request failed!");
            }

            const data: DataType = await response.json();

            setData(data);
        }
        catch(err){
            let message;

            if(err instanceof Error){
                message = err.message
            }
            else{
                message = String(err);
            }

            setError(message);

        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }

}

export default useHttp;
