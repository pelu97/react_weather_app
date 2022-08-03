// import { Fragment } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { UnitContextProvider } from "./store/UnitContext";

import Places from "./pages/Places";
import Weather from "./pages/Weather";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import skyImage from "./assets/sky.png";


function App() {

    // Caso uma url desconhecida seja digitada, redireciona para /
    // Cabeçalho parece em todas as páginas, então é renderizado independente das rotas

    return (
        <UnitContextProvider>
                <div className="background app" style={{backgroundImage: `url("${skyImage}")`}}>
                    <Header/>
                    <Routes>
                        Weather App
                        <Route path="/" element={<Places/>}/>
                        <Route path="/weather/:mode" element={<Weather/>}/>
                        <Route path="*" element={<Navigate replace to="/"/>} />
                    </Routes>
                    <Footer/>
                </div>
        </UnitContextProvider>
    );
}

export default App;
