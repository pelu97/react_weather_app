import { Link, useLocation } from "react-router-dom";

import UnitButton from "./UnitButton";

import arrowImage from "../../assets/arrow.png";
import classes from "./Header.module.css";

function Header(){
    const location = useLocation();

    // console.log(location);
    const showBackButton = location.pathname !== "/"

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
