// displays a chunk as a composite of tiles.
import './Chunk.css';
import Tile from '../Tile/Tile';

const Chunk = (props) => {
    // console.log("Chunk Props: ", props);
    
    const style = {
        border: props.showChunkGrid ? '1px solid red' : 'none',
    };

    const displayChunkDetails = () => {
        // console.log("Displaying Chunk Details: ");
        let details = "No Entities."
        if(props.chunk.entities.length > 0 && props.entityDefinitions.length > 0)
            details = `entities: ${props.chunk.entities.map(e => `
    ${props.entityDefinitions.find(d => d.type === e.type)?.name ?? e.type} at position (${e.x}, ${e.y})`)}`
        // console.log("Chunk Details: ", details);
        return details;
    }

    return (
        <div class="Chunk" title={displayChunkDetails()} style={style}>
            {
                // get each row of tiles tile
                props.chunk.tiles.map((tr, yIndex) => {
                    return <div class="TileRow">
                        {
                            // get each tile in the row
                            tr.map((c, xIndex) =>
                                <Tile 
                                    appState={props.appState}
                                    definition={props.tileDefinitions.find(d => d.type === c)} 
                                    tileResolution={props.tileResolution} 
                                    entityResolution={props.entityResolution} 
                                    showTileGrid={props.showTileGrid} 
                                    showFocusTile={props.showFocusTile} 
                                    showEntities={props.showEntities}
                                    position={props.convertMapToGlobalPosition(props.position.x, props.position.y, xIndex, yIndex)} 
                                    updateMapTile={props.updateMapTile} 
                                    updateChunkEntities={props.updateChunkEntities} 
                                    updateFocusTile={props.updateFocusTile} 
                                    focusTile={props.focusTile} 
                                    selectedTile={props.selectedTile} 
                                    selectedEntity={props.selectedEntity} 
                                    selectedArea={props.selectedArea}
                                    updateAreaSelect={props.updateAreaSelect}
                                    entity={props.showEntities ? props.chunk.entities.find(
                                            e => e.x === xIndex && e.y === yIndex
                                        ) : null
                                    }
                                />
                            )
                        }
                    </div>
                })
            }
        </div>
    );
}

export default Chunk;