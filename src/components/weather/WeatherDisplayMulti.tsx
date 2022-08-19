import { useState, useContext, useCallback, useEffect, Fragment } from "react";

import { useHttp } from "../../hooks/useHttp";

import UnitContext from "../../store/UnitContext";

// import { DUMMY_WEATHER_MULTI } from "./DUMMY_WEATHER";
import { WEATHER_API_KEY } from "../../api_keys/api_keys";

import LoadingSpinner from "../ui/LoadingSpinner";
import gradientLine from "../../assets/gradient_line.png";

import classes from "./WeatherDisplayMulti.module.css";

// https://api.openweathermap.org/data/2.5/forecast?lat=-15.793889&lon=-47.882778&cnt=5&appid=WEATHER_API_KEY


// Function to format the date string
function getDateString(date: Date, language: string): string{

    let languageCode = "pt-BR";

    if(language === "ptbr"){
        languageCode = "pt-BR";
    }
    else if(language === "en"){
        languageCode = "en-US";
    }
    else if(language === "esp"){
        languageCode = "es-ES";
    }

    let day = date.toLocaleString(languageCode, {weekday: "short"}).replace(".", "");

    day = day.charAt(0).toUpperCase() + day.slice(1);

    // console.log(day);

    let month = date.toLocaleString(languageCode, {month: "short"}).replace(".", "");

    month = month.charAt(0).toUpperCase() + month.slice(1);

    let dateString = day +
        ", " +
        date.toLocaleString(languageCode, {day: "numeric"}) +
        " " +
        month
    ;

    // console.log(dateString);

    return dateString;
}


// 5 Day Forecast API data format
// Formato dos dados retornados pela API de previsão de 5 dias
interface WeatherMultiData{
    cod: string,
    message: number,
    cnt: number,
    list: {
        dt: number,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            sea_level: number,
            grnd_lvel: number,
            humidity: number,
            temp_kf: number
        },
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        }[],
        clouds: {
            all: number
        },
        wind: {
            speed: number,
            deg: number,
            gust: number
        },
        visibility: number,
        pop: number,
        sys: {
            pod: string
        },
        dt_txt: string
    }[],
    city: {
        id: number,
        name: string,
        coord:{
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

interface WeatherDisplayMultiProps{
    lat: string | null,
    lon: string | null
}

// Search using the 5 Day / 3 Hour FOrecast API and show the weather for the next 5 days in the coordinates selected
// Busca usando a 5 Day / 3 Hour API e exibe o clima dos próximos 5 dias nas coordenadas selecionadas
function WeatherDisplayMulti(props: WeatherDisplayMultiProps){
    const {isLoading, error, sendRequest} = useHttp();
    const [weatherData, setWeatherData] = useState<WeatherMultiData>();
    const context = useContext(UnitContext);


    const setData = useCallback((data: WeatherMultiData) => {
        // console.log(data);
        // weather = data;
        setWeatherData(data);
    }, []);

    // const weather = DUMMY_WEATHER_MULTI;

    // console.log(weather);

    // Select texts based on the selected language
    // Seleciona os textos com base no idioma selecionado
    let language = "pt_br";
    let iconAlt = "Ícone referente ao clima atual";
    let lineAlt = "Gradiente de cor";
    let subtitle = "Previsão para 5 dias";
    let errorMessage = "Ocorreu um erro ao buscar os dados do clima! Espere um pouco e tente novamente.";

    if(context.languageSelected === "ptbr"){
        language = "pt_br";
        iconAlt = "Ícone referente ao clima atual";
        lineAlt = "Gradiente de cor";
        subtitle = "Previsão para 5 dias";
        errorMessage = "Ocorreu um erro ao buscar os dados do clima! Espere um pouco e tente novamente.";
    }
    else if(context.languageSelected === "en"){
        language = "en";
        iconAlt = "Current weather's icon";
        lineAlt = "Color gradient";
        subtitle = "5 day forecast";
        errorMessage = "An error ocurred when fetching weather data! Please wait a few minutes and try again.";
    }
    else if(context.languageSelected === "esp"){
        language = "sp";
        iconAlt = "Icono del tiempo actual";
        lineAlt = "Gradiente de color";
        subtitle = "Pronóstico de 5 días";
        errorMessage = "¡Se produjo un error al obtener los datos meteorológicos! Espere un momento y vuelva a intentarlo.";
    }

    // Send request to the API
    // Realiza a requisição a 5 Day / 3 Hour API do Open Weather
    useEffect(() => {
        sendRequest<WeatherMultiData>({
            url: context.isCelsius
            ? `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&units=metric&lang=${language}&appid=${WEATHER_API_KEY}`
            : `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&units=imperial&lang=${language}&appid=${WEATHER_API_KEY}`
        }, setData);
    }, [sendRequest, setData, context.isCelsius, props.lat, props.lon, language]);


    const dailyWeather: {
        day: string,
        tempMax: number,
        tempMin: number,
        description: string,
        iconCode: string
    }[] = [];


    // Group and process data because the API returns measurements with 3 hour intervals

    // Processa os dados pois a API retorna medidas de 3 em 3 horas para os próximos 5 dias
    // Agrupa as medidas de cada dia e extrai as informações necessárias
    if(weatherData){
        // console.log(weatherData);
        const day = new Date();
        day.setHours(0, 0, 0, 0);

        // console.log(today);
        // today.setDate(today.getDate() + 1);
        // console.log(today);

        for(let i=0; i<5; i++){
            day.setDate(day.getDate() + 1); //proximo dia
            day.setHours(0, 0, 0, 0);

            // console.log(day);

            // Filtra as medidas de um único dia
            const filtered = weatherData.list.filter((item) => {
                const date = new Date(item.dt * 1000);
                date.setHours(0, 0, 0, 0);

                return date.getTime() === day.getTime();
            });
            // console.log(day);
            // console.log(filtered);

            // Pega a temperatura máxima do dia
            const tempMax = Math.max(...filtered.map((element) => {
                return element.main.temp;
            }));

            // Pega a temperatura mínima do dia
            const tempMin = Math.min(...filtered.map((element) => {
                return element.main.temp;
            }));

            // console.log(tempMax, tempMin);

            let description = "";
            let iconCode = "";


            // For the weather description, selects the description for the noon measurement, because the API doesn't return one for the day
            //  only for each 3 hour measurement

            // Para a descrição (nublado, céu aberto, etc) do clima, tenta selecionar a medida do meio dia. Caso não exista, pega a última medida do dia.
            // Workaround necessário pois a API retorna medidas de 3 em 3 horas dos próximos 5 dias, e não retorna uma previsão diária
            //   compilada. Ou seja, seria necessário uma "média" da descrição do clima. O correto seria obter a previsão diária direto da API,
            //   mas a API de previsão diária é paga, enquanto a 5 Day / 3 Hour Forecast é de acesso gratuito. Acredito que para o escopo dessa aplicação,
            //   apenas selecionar uma das descrições do dia é suficiente.

            if(filtered.length >= 5){
                description = filtered[4].weather[0].description;
                iconCode = filtered[4].weather[0].icon;
            }
            else{
                description = filtered[filtered.length-1].weather[0].description;
                iconCode = filtered[filtered.length-1].weather[0].icon;
            }


            const dateString = getDateString(day, context.languageSelected);

            // Armazena as informações de cada um dos 5 dias
            dailyWeather.push({
                day: dateString,
                tempMax: tempMax,
                tempMin: tempMin,
                description: description,
                iconCode: iconCode
            });

        }
    }

    // console.log(dailyWeather);


    return(
        <div className={classes.list}>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && error && <p>{errorMessage} ({error})</p>}
            {
                !isLoading && !error && weatherData &&
                <Fragment>
                    <div className={classes.location_container}>
                        <p className={classes.location}>
                            {weatherData.city.name.toUpperCase()}
                        </p>
                        <p className={classes.subtitle}>
                            {subtitle}
                        </p>
                    </div>
                    <ul>
                        {
                            dailyWeather.map((item) => {
                                return(
                                    <li key={item.day}>
                                        <div className={classes.item}>
                                            <span className={classes.day}>
                                                {item.day}
                                            </span>
                                            <span className={classes.icon}>
                                                <img src={`http://openweathermap.org/img/wn/${item.iconCode}.png`} alt={iconAlt}/>
                                            </span>
                                            <span className={classes.temp_min}>
                                                {Math.round(item.tempMin)}°
                                            </span>
                                            <span className={classes.line}>
                                                <img src={gradientLine} alt={lineAlt}/>
                                            </span>
                                            <span className={classes.temp_max}>
                                                {Math.round(item.tempMax)}°
                                            </span>
                                            <span className={classes.description}>
                                                {item.description}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Fragment>
            }
        </div>
    );
}

export default WeatherDisplayMulti;
