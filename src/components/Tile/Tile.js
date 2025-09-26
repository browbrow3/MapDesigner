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
            props.updateTile(props.position.x, props.position.y);
            props.updateFocusTile(props.position.x, props.position.y);
            props.updateAreaSelect(props.position);
        }
    }

    return (
        <div id={getId()} class="tile" style={style} onClick={handleClick}>
            <img class="tile-image" alt={`Tile ${props.definition.type} at tile resolution ${props.tileResolution}p`} src={props.definition.type === -1 ? "resources/tiles/default-tile.png" : `resources/tiles/${props.tileResolution}p/tile_${props.definition.type}.png`}/>
            {(props.showEntities && props.entity) ? <img class="entity-image" alt={`Entity ${props.entity.type} at resolution ${props.entityResolution}p`} src={props.entity.type === -1 ? "resources/entities/default-entity.png" : `resources/entities/${props.entityResolution}p/sprite_${props.entity.type}_0_1_0.png`}/> : null}
        </div>
    );
}

export default Tile;