import classes from './LoadingSpinner.module.css';

// A simple loading animation

// Uma animação de carregamento simples
function LoadingSpinner(){
    return (
        <div className={classes.spinner}></div>
    );
}

export default LoadingSpinner;
