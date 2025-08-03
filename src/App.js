import './App.css';
import { useState, useEffect } from 'react';
import TilePicker from './components/TilePicker/TilePicker';
import ResolutionSelector from './components/ResolutionSelector/ResolutionSelector';
import Map from './components/Map/Map';
import MapExporter from './components/MapExporter/MapExporter';
import Checkbox from './components/Checkbox/Checkbox';

function App() {
  const [showTileGrid, setShowTileGrid] = useState(false);
  const [showChunkGrid, setShowChunkGrid] = useState(false);
  const [tileResolution, setTileResolution] = useState(8);
  const [tileDefinitions, setTileDefinitions] = useState([]);
  const [entityDefinitions, setEntityDefinitions] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [map, setMap] = useState(null);

  const clearSelectedTile = () => {
    setSelectedTile(null);
  }

  useEffect(() => {
    console.log("getting tile definitions...")
    fetch ('http://localhost:3000/resources/tiles/tile-definitions.json')
      .then((result) => result.json())
      .then((definitions) => {
        setTileDefinitions(definitions);
        console.log("loaded tile definitions: ", definitions);
      })
    },[]
  );

  useEffect(() => {
    console.log("getting entity definitions...")
    fetch ('http://localhost:3000/resources/entities/entity-definitions.json')
      .then((result) => result.json())
      .then((definitions) => {
        setEntityDefinitions(definitions);
        console.log("loaded entity definitions: ", definitions);
      })
    },[]
  );

  useEffect(() => {
    console.log("getting map definition...")
    fetch ('http://localhost:3000/resources/map/map.json')
      .then((result) => result.json())
      .then((mapDefinition) => {
        setMap(mapDefinition);
        console.log("loaded map definitions: ", mapDefinition);
      })
    },[]
  );

  return (
    <div class="App">
      <div class="header">
      </div>
      <div class="main">
        <div class="menu">
          <div class="logo">
            <img alt="Map Designer Logo" src="devil-icon.png" />
          </div>
          <div class="selected-tile">
            <h3>Selected Tile</h3>
            <p>{selectedTile}</p>
            <button id="clear-selected-tile" onClick={clearSelectedTile}>clear</button>
          </div>
          <div class="grid-settings">
            <h3>Grid Settings</h3>
            <Checkbox title="Tile" state={showTileGrid} setState={setShowTileGrid} />
            <Checkbox title="Chunk" state={showChunkGrid} setState={setShowChunkGrid} />
          </div>
          <ResolutionSelector setResolution={setTileResolution} resolutions={[8, 16, 32]} />
          <MapExporter map={map} />
        </div>
        <div class="canvas">
          <Map map={map} setMap={setMap} tileDefinitions={tileDefinitions} entityDefinitions={entityDefinitions} tileSize={tileResolution} showTileGrid={showTileGrid} showChunkGrid={showChunkGrid} selectedTile={selectedTile} />
        </div>
        <TilePicker definitions={tileDefinitions} size={tileResolution} setSelectedTile={setSelectedTile} selectedTile={selectedTile} />
      </div>
    </div>
  );
}

export default App;
