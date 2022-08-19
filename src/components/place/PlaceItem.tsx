import classes from "./PlaceItem.module.css";


interface PlaceItemProps{
    description: string,
    placeId: string,
    onClick: ({description, placeId}: {description: string, placeId: string}) => void,
    className?: string
}

// Autocomplete list of locations
function PlaceItem(props: PlaceItemProps){
    return(
        <li className={`${props.className} ${classes.item}`} onClick={() => {
            props.onClick({description: props.description, placeId: props.placeId});
        }}>
            <span>{props.description}</span>
        </li>
    );
}

export default PlaceItem;
