// displays a tile.
import './Tile.css';

const Tile = (props) => {
    // console.log("Tile Props:", props);
    
    const style = {
        outline: (
            !props.hasOwnProperty('position')) ? 'none' : (
                props.focusTile.x === props.position.x && 
                props.focusTile.y === props.position.y &&
                props.showFocusTile ? 
                    '3px solid red' : 'none'
            ),
        outlineOffset: '-3px',
        border: 
            (!props.hasOwnProperty('position')) ? 'none' : (
                props.showTileGrid ? '0.5px solid black' : 'none'
            )
    };

    const getId = () => 
        props.position ? `map-tile-${props.position.x}-${props.position.y}` : `tile-${props.definition.type}`;

    const handleClick = () => {
        // console.log(`Tile props (on handle click): `, props);
        if (props.hasOwnProperty('position')) {
            if (props.selectedTile != null || props.selectedTile > 0) {
                props.updateMapTile(props.position.x, props.position.y, props.selectedTile);
            }
            props.updateFocusTile(props.position.x, props.position.y);
        }
    }

    return (
        <div id={getId()} class="tile" style={style} onClick={handleClick}>
            <img alt={`Tile ${props.definition.type} at size ${props.size}p`} src={props.definition.type === -1 ? "resources/tiles/default-tile.png" : `resources/tiles/${props.size}p/tile_${props.definition.type}.png`}/>
        </div>
    );
}

export default Tile;