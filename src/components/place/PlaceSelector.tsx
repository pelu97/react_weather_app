import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MAPS_API_KEY } from "../../api_keys/api_keys";

// import AutoComplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import PlaceItem from "./PlaceItem";
import LoadingSpinner from "../ui/LoadingSpinner";

import classes from "./PlaceSelector.module.css";

function PlaceSelector(){

    const navigate = useNavigate();

    const {placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading, autocompleteSessionToken} = usePlacesService({
        apiKey: MAPS_API_KEY,
        debounce: 300,
        options: {
            // componentRestrictions: { country: "br" }
            bounds: {
                north: 5.272222,
                south: -33.742222,
                east: -34.791667,
                west: -73.992222

            },
            types: [
                "(cities)"
            ]
        },
        language: "pt-BR"
    });

    let placesExist = false;
    if(placePredictions && placePredictions.length > 0){
        placesExist = true;
    }

    // useEffect only to log place predictions
    useEffect(() => {
        console.log(placePredictions);
    }, [placePredictions]);


    function selectPlaceHandler(place: {description: string, placeId: string}){
        console.log(place.description);

        placesService.getDetails({
            placeId: place.placeId,
            sessionToken: autocompleteSessionToken,
            fields: ["geometry"]
        }, (placeDetails: any) => {
            console.log(placeDetails);

            // console.log(placeDetails.geometry.location);
            // console.log(placeDetails.geometry.location.lat());
            // console.log(placeDetails.geometry.location.lng());

            openWeatherPage({
                lat: placeDetails.geometry.location.lat(),
                lon: placeDetails.geometry.location.lng()
            });
        });
    }

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
                `} placeholder="Digite o nome da cidade" onChange={(event) => {
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
