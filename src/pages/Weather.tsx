import { useParams } from "react-router-dom";

import WeatherDisplaySingle from "../components/weather/WeatherDisplaySingle";
import WeatherDisplayMulti from "../components/weather/WeatherDisplayMulti";

import classes from "./Weather.module.css";

function Weather(){
    // const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();

    // const lat = searchParams.get("lat");
    // const lon = searchParams.get("lon");

    // console.log(lat, lon);
    // console.log(params);

    let multiMode;

    if(params.mode && (params.mode === "multi")){
        multiMode = true;
    }
    else{
        multiMode = false;
    }

    return(
        <div className={`centered ${classes.main}`}>
            <div className={classes.center}>
                {
                    !multiMode &&
                    <WeatherDisplaySingle/>
                }
                {
                    multiMode &&
                    <WeatherDisplayMulti/>
                }
            </div>
        </div>
    );
}

export default Weather;
