import { useEffect, useCallback, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
// import { DUMMY_WEATHER_SINGLE } from "./DUMMY_WEATHER";

import { useHttp } from "../../hooks/useHttp";
import UnitContext from "../../store/UnitContext";

import { WEATHER_API_KEY } from "../../api_keys/api_keys";

import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./WeatherDisplaySingle.module.css";

// https://api.openweathermap.org/data/2.5/weather?lat=-15.793889&lon=-47.882778&appid=WEATHER_API_KEY

// Formato dos dados retornados pela Current Weather API do Open Weather
interface WeatherSingleData{
    coord: {
        lon: number,
        lat: number
    },
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}


// Busca usando a Current Weather API e exibe o clima atual nas coordenadas selecionadas
function WeatherDisplaySingle(){
    const {isLoading, error, sendRequest} = useHttp();
    const [weatherData, setWeatherData] = useState<WeatherSingleData>();
    const context = useContext(UnitContext);
    const [searchParams] = useSearchParams();

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    let language = "pt_br";
    let iconAlt = "Ícone referente ao clima atual";
    let errorMessage = "Ocorreu um erro ao buscar os dados do clima! Espere um pouco e tente novamente.";

    if(context.languageSelected === "ptbr"){
        language = "pt_br";
        iconAlt = "Ícone referente ao clima atual";
        errorMessage = "Ocorreu um erro ao buscar os dados do clima! Espere um pouco e tente novamente.";
    }
    else if(context.languageSelected === "en"){
        language = "en";
        iconAlt = "Current weather's icon";
        errorMessage = "An error ocurred when fetching weather data! Please wait a few minutes and try again.";
    }
    else if(context.languageSelected === "esp"){
        language = "sp";
        iconAlt = "Icono del tiempo actual";
        errorMessage = "¡Se produjo un error al obtener los datos meteorológicos! Espere un momento y vuelva a intentarlo.";
    }

    const setData = useCallback((data: WeatherSingleData) => {
        // console.log(data);
        // weather = data;
        setWeatherData(data);
    }, []);

    useEffect(() => {
        sendRequest<WeatherSingleData>({
            url: context.isCelsius
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${language}&appid=${WEATHER_API_KEY}`
            : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&lang=${language}&appid=${WEATHER_API_KEY}`
        }, setData);
        // console.log("Send request");
        // console.log(searchParams.get("lat"));
        // console.log(searchParams.get("lon"));
    }, [sendRequest, setData, context.isCelsius, lat, lon, language]);


    return(
        <div>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && error && <p>{errorMessage} ({error})</p>}
            {!isLoading && !error && weatherData &&
                <div>
                    <div className={classes.location}>{weatherData.name.toUpperCase()}</div>
                    <div className={classes.description}>{
                        weatherData.weather[0].description.charAt(0).toUpperCase() +
                        weatherData.weather[0].description.slice(1)
                    }</div>
                    <div className={classes.temp_container}>
                        <div className={classes.temp}>
                            <span>{Math.round(weatherData.main.temp)}°</span>
                        </div>
                        <div className={classes.temp_icon}>
                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={iconAlt}/>
                        </div>
                    </div>
                    <div className={classes.temp_max_min}>
                        <div className={classes.temp_max}>
                            <span>MAX:</span>  {Math.round(weatherData.main.temp_max)}°
                        </div>
                        <div className={classes.temp_min}>
                            <span>MIN:</span>  {Math.round(weatherData.main.temp_min)}°
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default WeatherDisplaySingle;
