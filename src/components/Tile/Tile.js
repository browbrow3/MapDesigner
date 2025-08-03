// displays a tile.
import './Tile.css';

const Tile = (props) => {
    // console.log("Tile Props:", props);
    
    const style = {
        border: props.showTileGrid ? '0.5px solid black' : 'none',
    };

    const handleClick = () => {
        // console.log(`Tile props (on handle click): `, props);
        if (props.hasOwnProperty('position')) {
            if (props.selectedTile != null || props.selectedTile > 0) {
                props.updateMapTile(props.position.chunk.x, props.position.chunk.y, props.position.x, props.position.y, props.selectedTile);
            }
        }
    }

    return (
        <div class="tile" style={style} onClick={handleClick}>
            <img alt={`Tile ${props.definition.type} at size ${props.size}p`} src={props.definition.type === -1 ? "resources/tiles/default-tile.png" : `resources/tiles/${props.size}p/tile_${props.definition.type}.png`}/>
        </div>
    );
}

export default Tile;