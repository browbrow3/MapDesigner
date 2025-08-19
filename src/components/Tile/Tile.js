// displays a tile.
import './Tile.css';

const Tile = (props) => {
    // console.log("Tile Props:", props);
    
    const style = {};

    if (props.hasOwnProperty('position')) {
        if (props.showTileGrid) {
            style.border = '0.5px solid black';
        }

        if (
            props.selectedArea?.origin?.x !== null
            && props.selectedArea?.origin?.y !== null
            && props.selectedArea?.point?.x !== null
            && props.selectedArea?.point?.y !== null
            && (
                (
                    props.selectedArea.origin.x <= props.selectedArea.point.x
                    && props.selectedArea.origin.x <= props.position.x
                    && props.selectedArea.point.x >= props.position.x
                )
                || (
                    props.selectedArea.origin.x >= props.selectedArea.point.x
                    && props.selectedArea.point.x <= props.position.x
                    && props.selectedArea.origin.x >= props.position.x
                )
            )
            && (
                (
                props.selectedArea.origin.y <= props.selectedArea.point.y
                && props.selectedArea.origin.y <= props.position.y
                && props.selectedArea.point.y >= props.position.y
                )
                || (
                    props.selectedArea.origin.y >= props.selectedArea.point.y
                    && props.selectedArea.point.y <= props.position.y
                    && props.selectedArea.origin.y >= props.position.y
                )
            )
        ) {
            style.outline = '2px solid orange';
            style.outlineOffset = '-1px';
        }

        if (
            props.focusTile.x === props.position.x
            && props.focusTile.y === props.position.y
            && props.showFocusTile
        ) {
            style.outline = '3px solid red';
            style.outlineOffset = '-3px';
        }
    }

    const getId = () => 
        props.position ? `map-tile-${props.position.x}-${props.position.y}` : `tile-${props.definition.type}`;

    const handleClick = () => {
        // console.log(`Tile props (on handle click): `, props);
        if (props.hasOwnProperty('position')) {
            if (props.selectedTile != null || props.selectedTile > 0) {
                props.updateMapTile(props.position.x, props.position.y, props.selectedTile);
            }
            props.updateFocusTile(props.position.x, props.position.y);
            props.updateAreaSelect(props.position);
        }
    }

    return (
        <div id={getId()} class="tile" style={style} onClick={handleClick}>
            <img alt={`Tile ${props.definition.type} at size ${props.size}p`} src={props.definition.type === -1 ? "resources/tiles/default-tile.png" : `resources/tiles/${props.size}p/tile_${props.definition.type}.png`}/>
        </div>
    );
}

export default Tile;