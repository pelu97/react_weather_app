import { createContext, ReactNode, useState, useEffect } from "react";


// Context usado para armazenar a unidade de temperatura selecionada;
// Facilita o uso e a alteração dessa informação, sem precisar passar como parâmetro para todo componente que precise dela



interface UnitContextLayout{
    isCelsius: boolean,
    onToggleUnit: () => void
}

const UnitContext = createContext<UnitContextLayout>({
    isCelsius: true,
    onToggleUnit: () => {}
});


interface UnitContextProviderProps{
    children: ReactNode
}

export function UnitContextProvider(props: UnitContextProviderProps){
    const [isCelsius, setIsCelsius] = useState(true);

    // useEffect just for logging the unit stat after changing it
    useEffect(() => {
        console.log(isCelsius);
    }, [isCelsius]);

    function toggleUnitHandler(){
        setIsCelsius((prevState) => {
            return !prevState;
        });
    }


    return (
        <UnitContext.Provider value={{
            isCelsius: isCelsius,
            onToggleUnit: toggleUnitHandler
        }}>
            {props.children}
        </UnitContext.Provider>
    );
}

export default UnitContext;
