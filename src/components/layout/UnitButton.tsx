import { useContext } from "react";

import UnitContext from "../../store/UnitContext";

import classes from "./UnitButton.module.css";


// Temperature unit selector
function UnitButton(){
    // const [isCelsius, setIsCelsius] = useState(true);
    const unitContext = useContext(UnitContext);

    function toggleHandler(){
        // console.log(!isCelsius);
        // setIsCelsius(!isCelsius);

        unitContext.onToggleUnit();
    }

    return(
        <div className={classes.main}>
            <span className={classes.unit_f}>°F</span>
            <label className={classes.switch}>
                <input type="checkbox" onChange={toggleHandler} defaultChecked={unitContext.isCelsius}/>
                <span className={`${classes.slider} ${classes.round}`}></span>
            </label>
            <span className={classes.unit_c}>°C</span>
        </div>

    );
}

export default UnitButton;
