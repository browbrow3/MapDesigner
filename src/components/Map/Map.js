// displays the map as a composite of tiles.
import './Map.css';
import Chunk from '../Chunk/Chunk';

const Map = (props) => {
    //console.log("Map Props: ", props);

    const updateMapTile = (chunkXInMap, chunkYInMap, tileXInChunk, tileYInChunk, newType) => {
        console.log(`Map.updateMapTile: chunkXInMap = ${chunkXInMap}, chunkYInMap = ${chunkYInMap}, tileXInChunk = ${tileXInChunk}, tileYInChunk = ${tileYInChunk}, newType = ${newType}`);
        let newMap = [...props.map];
        newMap[chunkYInMap][chunkXInMap].tiles[tileYInChunk][tileXInChunk] = newType;
        props.setMap(newMap);
    }

    return (
        <div class="Map">
            {
                props.map != null && props.map.length > 0 ? (
                    props.tileDefinitions.length > 0 ? (
                        // get each row of chunks
                        props.map.map((cr, yIndex) =>
                            <div class="ChunkRow">
                                {
                                    // get each chunk in the row
                                    cr.map((c, xIndex) => 
                                        <Chunk chunk={c} tileDefinitions={props.tileDefinitions} entityDefinitions={props.entityDefinitions} tileSize={props.tileSize} showTileGrid={props.showTileGrid} showChunkGrid={props.showChunkGrid} position={{x: xIndex, y: yIndex}} updateMapTile={updateMapTile} selectedTile={props.selectedTile} />
                                    )
                                }
                            </div>
                        )
                    ) : "Loading Tile Definitions..."
                ) : "Loading Map Definition..."
            }
        </div>
    );
}

export default Map;