import classes from './LoadingSpinner.module.css';

// Uma animação de carregamento simples
function LoadingSpinner(){
    return (
        <div className={classes.spinner}></div>
    );
}

export default LoadingSpinner;
