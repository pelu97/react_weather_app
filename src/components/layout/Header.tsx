import { Link, useLocation } from "react-router-dom";

import UnitButton from "./UnitButton";

import arrowImage from "../../assets/arrow.png";
import classes from "./Header.module.css";

// Header - contains the back button and the temperature unit selector
function Header(){
    const location = useLocation();

    // console.log(location);
    // Only shows the back button if not in the starting page
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
