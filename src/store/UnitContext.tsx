import { createContext, ReactNode, useState, useEffect } from "react";



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

    // useEffect just for loggin the unit stat after changing it
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
