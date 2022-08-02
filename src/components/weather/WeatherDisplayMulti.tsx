

import { DUMMY_WEATHER_MULTI } from "./DUMMY_WEATHER";

// https://api.openweathermap.org/data/2.5/forecast?lat=-15.793889&lon=-47.882778&cnt=5&appid=9cbbeb9c607641f22424ca43db8f5156


function WeatherDisplayMulti(){

    const weather = DUMMY_WEATHER_MULTI;

    console.log(weather);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const filtered = weather.list.filter((item) => {
        const date = new Date(item.dt * 1000);
        date.setUTCHours(0, 0, 0, 0);
        console.log(date.getTime(), today.getTime());
        return date.getTime() === today.getTime();
    });

    console.log(filtered);

    const date = new Date(weather.list[0].dt * 1000);
    // console.log(weather.list[0].dt);
    console.log(date.getDate());

    return(
        <div>
            Weather Display Multi
        </div>
    );
}

export default WeatherDisplayMulti;
