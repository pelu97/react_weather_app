import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MAPS_API_KEY } from "../../api_keys/api_keys";
import UnitContext from "../../store/UnitContext";

// import AutoComplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import PlaceItem from "./PlaceItem";
import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./PlaceSelector.module.css";


// Buscador e seletor de lugares (limitados para cidades)
// Utiliza o hook usePlacesService do pacote react-google-autocomplete para buscar os dados da Places API do Google Maps,
//   com um delay para evitar muitas requisições e diminuir custos. O hook retorna os dados em um vetor, que é utilizado para exibir os locais para o usuário
// A busca é influenciada para uma área que contém todo território brasileiro, mas locais externos a essa área também aparecem na busca,
//   apenas com menor prioridade.

function PlaceSelector(){
    const navigate = useNavigate();
    const context = useContext(UnitContext);

    let language = "pt-BR";
    let placeholderText = "Digite o nome da cidade";

    if(context.languageSelected === "ptbr"){
        language = "pt-BR";
        placeholderText = "Digite o nome da cidade";
    }
    else if(context.languageSelected === "en"){
        language = "en";
        placeholderText = "Input the city's name";
    }
    else if(context.languageSelected === "esp"){
        language = "es";
        placeholderText = "Introduzca el nombre de la ciudad";
    }

    // Hook do react-google-autocomplete
    const {placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading, autocompleteSessionToken} = usePlacesService({
        apiKey: MAPS_API_KEY,
        debounce: 300, //Tempo em milisegundos para esperar antes de enviar uma requisição - evita requisições excessivas
        options: {
            // componentRestrictions: { country: "br" }
            bounds: {
                north: 5.272222,
                south: -33.742222,
                east: -34.791667,
                west: -73.992222

            }, //Influencia os resultados para uma área que contém todo o território brasileiro.
            types: [
                "(cities)"
            ] //Limita os resultados para apenas cidades
        },
        language: language
    });

    let placesExist = false;
    if(placePredictions && placePredictions.length > 0){
        placesExist = true;
    }

    // useEffect only to log place predictions
    useEffect(() => {
        console.log(placePredictions);
    }, [placePredictions]);

    // Executa quando um lugar é selecionado na lista. Busca as coordenadas desse lugar
    function selectPlaceHandler(place: {description: string, placeId: string}){
        console.log(place.description);

        placesService.getDetails({
            placeId: place.placeId,
            sessionToken: autocompleteSessionToken,
            fields: ["geometry"]
        }, (placeDetails: any) => {
            // console.log(placeDetails);
            // console.log(placeDetails.geometry.location);
            // console.log(placeDetails.geometry.location.lat());
            // console.log(placeDetails.geometry.location.lng());

            openWeatherPage({
                lat: placeDetails.geometry.location.lat(),
                lon: placeDetails.geometry.location.lng()
            });
        });
    }

    // Abre a página do tempo, no modo de tempo atual, passando as coordenadas do local pela url
    function openWeatherPage(coords: {lat: number, lon: number}){
        console.log(coords);

        // Navigates to weather page with latitude and longitude of the selected location
        navigate(`weather/single?lat=${coords.lat}&lon=${coords.lon}`);
    }

    // className={`${classes.inputText} ${classes.inputText_empty}`}

    return(
        <div className={classes.main}>
            <input className={`
                ${classes.inputText} ${placesExist ? classes.inputText_full : classes.inputText_empty}
                `} placeholder={placeholderText} onChange={(event) => {
                getPlacePredictions({input: event.target.value});
            }}/>
            {
                isPlacePredictionsLoading &&
                !placesExist &&
                <LoadingSpinner/>
            }
            <div className={classes.list}>
                <ul>
                    {placePredictions.map((item) => {
                        return <PlaceItem className={classes.inputText} key={item.place_id} description={item.description} placeId={item.place_id} onClick={selectPlaceHandler}/>
                    })}
                </ul>
            </div>
        </div>
    );

}

export default PlaceSelector;
