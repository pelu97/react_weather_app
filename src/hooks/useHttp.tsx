import { useState, useCallback } from "react";


// Hook customizado para realizar as requisições para a API do OpenWeather
// A Places API do Google Maps é utilizada por meio do pacote react-google-autcomplete e não utiliza esse hook

// Retorno:
// -- isLoading: boolean: Se está esperando pela resposta de uma requisição
// -- error: string | null: Uma mensagem de erro, caso tenha ocorrido algum
// -- sendRequest: async function<DataType>(request: RequestType, setData: (data: DataType) => void): A função que deve ser executada para enviar uma requisição 

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
