import PlaceSelector from "../components/place/PlaceSelector";

import classes from "./Places.module.css";


// Página com a busca de cidades

function Places(){
    return(
        <div className={`centered_noflex ${classes.placesPage}`}>
            <div className={classes.center}>
                <h1>Como está o tempo hoje?</h1>
                <PlaceSelector/>
            </div>
        </div>
    );
}

export default Places;
