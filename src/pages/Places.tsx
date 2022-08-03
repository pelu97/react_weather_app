import { useContext } from "react";

import UnitContext from "../store/UnitContext";

import PlaceSelector from "../components/place/PlaceSelector";

import classes from "./Places.module.css";


// Página com a busca de cidades

function Places(){
    const context = useContext(UnitContext);

    let title = "Como está o tempo hoje?";

    if(context.languageSelected === "ptbr"){
        title = "Como está o tempo hoje?";
    }
    else if(context.languageSelected === "en"){
        title = "How's the weather today?";
    }
    else if(context.languageSelected === "esp"){
        title = "¿Cómo está el clima hoy?";
    }

    return(
        <div className={`centered_noflex ${classes.placesPage}`}>
            <div className={classes.center}>
                <h1>{title}</h1>
                <PlaceSelector/>
            </div>
        </div>
    );
}

export default Places;
