import { createContext, ReactNode, useState } from "react";


// Context usado para armazenar a unidade de temperatura e o idioma selecionado;
// Facilita o uso e a alteração dessas informações, sem precisar passar como parâmetro para todo componente que precise delas



interface UnitContextLayout{
    isCelsius: boolean,
    onToggleUnit: () => void,
    languageSelected: string
    onChangeLanguage: (language: string) => void
}

const UnitContext = createContext<UnitContextLayout>({
    isCelsius: true,
    onToggleUnit: () => {},
    languageSelected: "ptbr",
    onChangeLanguage: (language: string) => {}
});


interface UnitContextProviderProps{
    children: ReactNode
}

export function UnitContextProvider(props: UnitContextProviderProps){
    const [isCelsius, setIsCelsius] = useState(true);
    const [languageSelected, setLanguageSelected] = useState("ptbr");

    // useEffect just for logging the unit state after changing it
    // useEffect(() => {
    //     console.log(isCelsius);
    // }, [isCelsius]);

    function toggleUnitHandler(){
        setIsCelsius((prevState) => {
            return !prevState;
        });
    }

    function languageChangeHandler(language: string){
        setLanguageSelected(language);
    }


    return (
        <UnitContext.Provider value={{
            isCelsius: isCelsius,
            onToggleUnit: toggleUnitHandler,
            languageSelected: languageSelected,
            onChangeLanguage: languageChangeHandler
        }}>
            {props.children}
        </UnitContext.Provider>
    );
}

export default UnitContext;
