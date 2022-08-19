import { useEffect, useCallback, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
// import { DUMMY_WEATHER_SINGLE } from "./DUMMY_WEATHER";

import { useHttp } from "../../hooks/useHttp";
import UnitContext from "../../store/UnitContext";

import { WEATHER_API_KEY } from "../../api_keys/api_keys";

import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./WeatherDisplaySingle.module.css";

// https://api.openweathermap.org/data/2.5/weather?lat=-15.793889&lon=-47.882778&appid=WEATHER_API_KEY


// Open Weather Current Weather API data format
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


interface WeatherDisplaySingleProps{
    lat: string | null,
    lon: string | null
}

// Search using the Current Weather API and shows the current weather in the selected coordinates
// Busca usando a Current Weather API e exibe o clima atual nas coordenadas selecionadas
function WeatherDisplaySingle(props: WeatherDisplaySingleProps){
    const {isLoading, error, sendRequest} = useHttp();
    const [weatherData, setWeatherData] = useState<WeatherSingleData>();
    const context = useContext(UnitContext);
    // const [searchParams] = useSearchParams();
    //
    // const lat = searchParams.get("lat");
    // const lon = searchParams.get("lon");

    // Choose the text based on the selected language
    // Escolhe os textos com base no idioma selecionado
    let language = "pt_br";
    let iconAlt = "Ícone referente ao clima atual";
    let linkText = "Ver previsão para os próximos 5 dias";
    let errorMessage = "Ocorreu um erro ao buscar os dados do clima! Espere um pouco e tente novamente.";

    if(context.languageSelected === "ptbr"){
        language = "pt_br";
        iconAlt = "Ícone referente ao clima atual";
        linkText = "Ver previsão para os próximos 5 dias";
        errorMessage = "Ocorreu um erro ao buscar os dados do clima! Espere um pouco e tente novamente.";
    }
    else if(context.languageSelected === "en"){
        language = "en";
        iconAlt = "Current weather's icon";
        linkText = "See forecast for the next 5 days";
        errorMessage = "An error ocurred when fetching weather data! Please wait a few minutes and try again.";
    }
    else if(context.languageSelected === "esp"){
        language = "sp";
        iconAlt = "Icono del tiempo actual";
        linkText = "Ver pronóstico para los próximos 5 días";
        errorMessage = "¡Se produjo un error al obtener los datos meteorológicos! Espere un momento y vuelva a intentarlo.";
    }


    const setData = useCallback((data: WeatherSingleData) => {
        // console.log(data);
        // weather = data;
        setWeatherData(data);
    }, []);

    // Sends the request to the Current Weather API
    // Realiza a requisição para a Current Weather API do Open Weather
    useEffect(() => {
        sendRequest<WeatherSingleData>({
            url: context.isCelsius
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&units=metric&lang=${language}&appid=${WEATHER_API_KEY}`
            : `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&units=imperial&lang=${language}&appid=${WEATHER_API_KEY}`
        }, setData);
        // console.log("Send request");
        // console.log(searchParams.get("lat"));
        // console.log(searchParams.get("lon"));
    }, [sendRequest, setData, context.isCelsius, props.lat, props.lon, language]);

    // Maximum and minimum temperatures returned by the API are not the maximum and minimum of the day, but just a variation
    //  of the current measurement. For this application, these should be enough. Also, its the free API.

    // As temperaturas máxima e mínima retornadas pela Current Weather API não são a máxima e mínima do dia e sim uma máxima e mínima da temperatura medida naquele momento.
    // Para obter a máxima e mínima do dia, seria necessário acesso a uma API com dados do dia, mas são pagas, ou compilar utilizando as temperaturas retornadas
    //   pela 5 Day / 3 Hour Forecast API, mas ela não retorna medidas passadas. Para o escopo dessa aplicação, acredito que essas temperaturas retornadas pela
    //   Current Weather API são suficientes.

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
                    <Link className={classes.link} to={`/weather/multi?lat=${props.lat}&lon=${props.lon}`}>{linkText}</Link>
                </div>
            }
        </div>
    );
}

export default WeatherDisplaySingle;
