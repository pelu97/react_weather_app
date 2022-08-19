import { useContext } from "react";

import UnitContext from "../../store/UnitContext";

import braFlag from "../../assets/brasil.png";
import usaFlag from "../../assets/estados-unidos.png";
import spaFlag from "../../assets/spain.png";

import classes from "./LanguageSelector.module.css";

// Language selector

function LanguageSelector(){
    const context = useContext(UnitContext);

    let languageDisplay = "";

    if(context.languageSelected === "ptbr"){
        languageDisplay = "Idioma selecionado: Português";
    }
    else if(context.languageSelected === "en"){
        languageDisplay = "Language selected: English";
    }
    else if(context.languageSelected === "esp"){
        languageDisplay = "Idioma seleccionado: Español";
    }

    function changeLanguage(language: string){
        context.onChangeLanguage(language);
    }


    return(
        <div className={classes.selector}>
            <img onClick={() => {changeLanguage("ptbr");}} src={braFlag} alt="Português brasileiro"/>
            <img onClick={() => {changeLanguage("en");}} src={usaFlag} alt="English"/>
            <img onClick={() => {changeLanguage("esp");}} src={spaFlag} alt="Español"/>
            <p>{languageDisplay}</p>
        </div>
    );
}

export default LanguageSelector;
