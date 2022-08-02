import { Link, useLocation } from "react-router-dom";

import UnitButton from "./UnitButton";

import arrowImage from "../../assets/arrow.png";
import classes from "./Header.module.css";

// Cabeçalho. Contém o botão de voltar e o botão de selecionar a unidade de temperatura
function Header(){
    const location = useLocation();

    // console.log(location);
    // Exibe o botão de voltar apenas se já não estiver na tela principal
    const showBackButton = (location.pathname !== "/");

    return(
        <header className={classes.header}>
            {
                showBackButton &&
                <div className={classes.back_button}>
                    <Link to="/"><img src={arrowImage} alt="Botão de voltar"/></Link>
                </div>
            }
            {/*
            <div className={classes.back_button}>
                <Link className={classes.icon} to="/"><div className={classes.arrow}/></Link>
            </div>
            */}
            {/*<span className="centered">Header</span>*/}
            <div className={classes.spacer}/>
            <div className={classes.unit_button}>
                <UnitButton/>
            </div>
        </header>
    );
}

export default Header;
