import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
// import logo from './logo.svg';

import { UnitContextProvider } from "./store/UnitContext";

import Places from "./pages/Places";
import Weather from "./pages/Weather";

import Header from "./components/layout/Header";

import skyImage from "./assets/sky.png";

import './App.css';

function App() {

    // useEffect(() =>{
    //     const script = document.createElement("script");
    //
    //     script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
    //
    //     document.body.appendChild(script);
    // }, []);


    return (
        <UnitContextProvider>
            <Fragment>
                <div className="background app" style={{backgroundImage: `url("${skyImage}")`}}>
                    <Header/>
                    <Routes>
                        Weather App
                        <Route path="/" element={<Places/>}/>
                        <Route path="/weather/:mode" element={<Weather/>}/>
                    </Routes>
                </div>
            </Fragment>
        </UnitContextProvider>
    );
}

/*
<div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </header>
</div>
*/

export default App;
