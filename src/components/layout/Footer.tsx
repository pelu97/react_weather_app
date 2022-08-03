import LanguageSelector from "./LanguageSelector";

import classes from "./Footer.module.css";

function Footer(){
    return(
        <footer className={classes.footer}>
            <LanguageSelector/>
        </footer>
    );
}

export default Footer;
