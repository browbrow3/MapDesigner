import React from 'react';
import './TileDefinition.css';
import Tile from '../Tile/Tile'
import TileProperties from '../TileProperties/TileProperties';

const TileDefinition = (props) => {
    const handleClick = () => {
        if(props.selectedTile === props.definition.type) {
            props.setSelectedTile(null);
        }
        else {
            props.setSelectedTile(props.definition.type);
        }
    }

    return (
        <div id={`tile-definition-${props.definition.type}`} class={props.selectedTile === props.definition.type ? "tile-definition-selected" : "tile-definition"} onClick={handleClick}>
            <Tile definition={props.definition} size={props.size} />
            <TileProperties definition={props.definition} />
        </div>
    );
}

export default TileDefinition;