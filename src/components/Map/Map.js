// displays the map as a composite of tiles.
import {useEffect, useState} from 'react';
import './Map.css';
import Chunk from '../Chunk/Chunk';

// validates that all chunks have consistent row/column counts.
export const validateMap = (map) => {
    const chunkHeight = map[0][0].tiles.length;
    const chunkWidth = map[0][0].tiles[0].length;

    // any chunk rows (returns true if anomoly found)
    return !map.some(cr =>
        // with any chunk
        cr.some(c =>
            // where the height of the chunk is inconsistent
            c.tiles.length !== chunkHeight || 
            // or the length of any row of tiles in that chunk is inconsistent
            c.tiles.some(tr => tr.length !== chunkWidth)
        )
    )
}

const Map = (props) => {
    // console.log(`Map props: `);
    // console.table(props);
    const [focusTile, setFocusTile] = useState({x: 0, y: 0});
    
    useEffect(() => {
        // console.log("map useEffect update focus");
        if (props.mapRef.current !== null) {
            props.mapRef.current.focus();
        }
    },[props.mapRef, props.features.enableKeyboardControl])
    
    const updateMapTile = (x, y, newType) => {
        // console.log(`Map::updateMapTile: x = ${x}, y = ${y}, newType = ${newType}`);
        const position = convertGlobalToMapPosition(x, y);
        let newMap = [...props.map];
        // console.log(`Map::updateMapTile: position: `, position);
        newMap[position.chunkY][position.chunkX].tiles[position.tileY][position.tileX] = newType;
        props.setMap(newMap);
    }

    const updateSelectedMapTiles = (selectedArea, newType) => {
        // console.log(`Map::updateSelectedMapTiles: newType = ${newType}`);
        const start = {
            x: selectedArea.origin.x < selectedArea.point.x ? selectedArea.origin.x : selectedArea.point.x,
            y: selectedArea.origin.y < selectedArea.point.y ? selectedArea.origin.y : selectedArea.point.y
        }
        const end = {
            x: selectedArea.origin.x < selectedArea.point.x ? selectedArea.point.x : selectedArea.origin.x,
            y: selectedArea.origin.y < selectedArea.point.y ? selectedArea.point.y : selectedArea.origin.y
        }

        for(let j = start.y; j <= end.y; j++) {
            for (let i = start.x; i <= end.x; i++) {
                updateMapTile(i, j, newType);
            }
        }
    }

    const updateFocusTile = (x, y) => {
        // console.log(`Map::updateFocusTile: x = ${x}, y = ${y}`);
        setFocusTile({ x: x, y: y });
    }

    const updateAreaSelect = (point) => {
        if (props.appState.heldKeys.shift || props.appState.heldKeys.ctrl) {
            if (props.selectedArea?.origin?.x === null || props.selectedArea?.origin?.y === null) {
                props.setSelectedArea({origin: {x: focusTile.x, y: focusTile.y}, point: point})
            }
            else {
                props.setSelectedArea({...props.selectedArea, point});
            }
        }
    }

    // converts a global position {x, y} to a position within the map {chunkX, chunkY, tileX, tileY}
    const convertGlobalToMapPosition = (x, y) => {
        // console.log(`Map::convertGlobalToMapPosition: x = ${x}, y = ${y}`);
        const chunkHeight = props.map[0][0].tiles.length;
        const chunkWidth = props.map[0][0].tiles[0].length;

        return {
            chunkY: Math.floor(y / chunkHeight),
            tileY: y % chunkHeight,
            chunkX: Math.floor(x / chunkWidth),
            tileX: x % chunkWidth,
        }
    }

    const convertMapToGlobalPosition = (chunkX, chunkY, tileX, tileY) => {
        // console.log(`Map::convertGlobalToMapPosition: chunkX = ${chunkX}, chunkY = ${chunkY}, tileX = ${tileX}, tileY = ${tileY}`);
        const chunkHeight = props.map[0][0].tiles.length;
        const chunkWidth = props.map[0][0].tiles[0].length;

        return {
            x: (chunkWidth * chunkX) + tileX,
            y: (chunkHeight * chunkY) + tileY,
        }
    }

    // map height = map_height_chunks * chunk_height_tiles
    const getMapHeightInTiles = () => props.map.length * props.map[0][0].tiles.length;
        // map width = map_width_chunks * chunk_width_tiles
    const getMapWidthInTiles = () => props.map[0].length * props.map[0][0].tiles[0].length;

    const handleKeyDown = (event) => {
        if (props.features.enableKeyboardControl) {
            // console.log("Map::handleKeyDown - key pressed: ", event.key);

            switch (event.key) {
                case "ArrowDown": {
                    // console.log("Arrow Down Pressed in Map");
                    const point = {x: focusTile.x, y: focusTile.y < getMapHeightInTiles() - 1 ? focusTile.y + 1 : getMapHeightInTiles() };
                    setFocusTile(point);
                    updateAreaSelect(point);
                    event.preventDefault();
                    break;
                }
                case "ArrowUp": {
                    // console.log("Arrow Up Pressed in Map");
                    const point = {x: focusTile.x, y: focusTile.y > 0 ? focusTile.y - 1 : 0 };
                    setFocusTile(point);
                    updateAreaSelect(point);
                    event.preventDefault();
                    break;
                }
                case "ArrowLeft": {
                    // console.log("Arrow Left Pressed in Map");
                    const point = {x: focusTile.x > 0 ? focusTile.x - 1 : 0, y: focusTile.y };
                    setFocusTile(point);
                    updateAreaSelect(point);
                    break;
                }
                case "ArrowRight": {
                    // console.log("Arrow Right Pressed in Map");
                    const point = {x: focusTile.x < getMapWidthInTiles() - 1 ? focusTile.x + 1 : getMapWidthInTiles(), y: focusTile.y };
                    setFocusTile(point);
                    updateAreaSelect(point);
                    break;
                }
                case "Enter": {
                    // console.log(`Enter Pressed in Map - x = ${focusTile.x}, y = ${focusTile.y}`);
                    if (
                        (props.appState.heldKeys.shift || props.appState.heldKeys.ctrl)
                        && props.selectedArea?.origin?.x
                        && props.selectedArea?.origin?.y
                        && props.selectedArea?.point?.x
                        && props.selectedArea?.point?.y
                    ) {
                        updateSelectedMapTiles(props.selectedArea, props.selectedTile);
                    }
                    else {
                        updateMapTile(focusTile.x, focusTile.y , props.selectedTile);
                    }
                    break;
                }
                case " ": {
                    // console.log(`Space Pressed in Map - x = ${focusTile.x}, y = ${focusTile.y}`);
                    if (
                        (props.appState.heldKeys.shift || props.appState.heldKeys.ctrl)
                        && props.selectedArea?.origin?.x
                        && props.selectedArea?.origin?.y
                        && props.selectedArea?.point?.x
                        && props.selectedArea?.point?.y
                    ) {
                        updateSelectedMapTiles(props.selectedArea, props.selectedTile);
                    }
                    else {
                        updateMapTile(focusTile.x, focusTile.y , props.selectedTile);
                    }
                    event.preventDefault();
                    break;
                }
                default: break;
            }
        }
    }

    return (
        <div class="Map" ref={props.mapRef} tabIndex={props.tabIndex} onKeyDown={handleKeyDown}>
            {
                props.map != null && props.map.length > 0 ? (
                    props.tileDefinitions.length > 0 ? (
                        // get each row of chunks
                        props.map.map((cr, yIndex) =>
                            <div class="ChunkRow">
                                {
                                    // get each chunk in the row
                                    cr.map((c, xIndex) => 
                                        <Chunk 
                                            appState={props.appState}
                                            chunk={c} 
                                            tileDefinitions={props.tileDefinitions} 
                                            entityDefinitions={props.entityDefinitions} 
                                            tileSize={props.tileSize} 
                                            showTileGrid={props.showTileGrid} 
                                            showFocusTile={props.showFocusTile} 
                                            showChunkGrid={props.showChunkGrid} 
                                            position={{x: xIndex, y: yIndex}} 
                                            convertMapToGlobalPosition={convertMapToGlobalPosition} 
                                            updateMapTile={updateMapTile} 
                                            updateFocusTile={updateFocusTile} 
                                            focusTile={focusTile} 
                                            selectedTile={props.selectedTile} 
                                            selectedArea={props.selectedArea}
                                            updateAreaSelect={updateAreaSelect}
                                        />
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