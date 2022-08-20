# React Weather App

This is a Weather App built using React with TypeScript. 
Its also a Single Page Application using React Router DOM.

![Main Screen Image](images/main_screen.png?raw=true)

It uses the Google Maps API to present a location search bar with Autocomplete, set to search for cities and biased towards Brazil's geographical coordinates.
The OpenWeather free API is used to fetch the weather data. There are a few workarounds due to limitations to the data returned by the free API. For acuraccy, one of the paid ones would complete the rest of the data that is presented, but for demonstration purposes the free one is definitely enough (and free).


![Current Weather Image](images/weather_single.png?raw=true)

![5 Day Weather Image](images/weather_multi.png?raw=true)

## API keys
To use the APIs, you must create your own API keys and paste them into the file `./src/api_keys/api_keys.tsx` int their respective locations.


## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
