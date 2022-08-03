import { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import UnitContext from "../store/UnitContext";

import WeatherDisplaySingle from "../components/weather/WeatherDisplaySingle";
import WeatherDisplayMulti from "../components/weather/WeatherDisplayMulti";

import classes from "./Weather.module.css";


// Página com os componentes de exibição do clima
function Weather(){
    const params = useParams();
    const [searchParams] = useSearchParams();
    const context = useContext(UnitContext);


    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // console.log(lat, lon);

    // Verifica se deve exibir o componente de clima do dia atual ou o de clima dos próximos 5 dias
    let multiMode;

    if(params.mode && (params.mode === "multi")){
        multiMode = true;
    }
    else{
        multiMode = false;
    }


    // Caso algum dos parâmetros estejam faltando, exibe uma mensagem de erro
    let badUrlMessage = "Ocorreu um problema com a URL. Verifique se ela não foi alterada.";

    if(context.languageSelected === "ptbr"){
        badUrlMessage = "Ocorreu um problema com a URL. Verifique se ela não foi alterada.";
    }
    else if(context.languageSelected === "en"){
        badUrlMessage = "A problem ocurred with the URL. Verify that it wasn't modified.";
    }
    else if(context.languageSelected === "esp"){
        badUrlMessage = "Hubo un problema con la URL. Asegúrate de que no haya sido modificado.";
    }

    const badUrl = (!lat || !lon);


    return(
        <div className={`centered ${classes.main}`}>
            <div className={classes.center}>
                {badUrl && <p>{badUrlMessage}</p>}
                {
                    !badUrl &&
                    !multiMode &&
                    <WeatherDisplaySingle lat={lat} lon={lon}/>
                }
                {
                    !badUrl &&
                    multiMode &&
                    <WeatherDisplayMulti lat={lat} lon={lon}/>
                }
            </div>
        </div>
    );
}

export default Weather;
