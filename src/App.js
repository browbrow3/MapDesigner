import './App.css';
import { useState, useEffect, useRef } from 'react';
import TilePicker from './components/TilePicker/TilePicker';
import ResolutionSelector from './components/ResolutionSelector/ResolutionSelector';
import Map, { validateMap } from './components/Map/Map';
import MapExporter from './components/MapExporter/MapExporter';
import Checkbox from './components/Checkbox/Checkbox';
import Indicator from './components/Indicator/Indicator'

function App() {
  const [showTileGrid, setShowTileGrid] = useState(false);
  const [showFocusTile, setShowFocusTile] = useState(false);
  const [showChunkGrid, setShowChunkGrid] = useState(false);
  const [enableKeyboardControl, setEnableKeyboardControl] = useState(false);
  const [tileResolution, setTileResolution] = useState(8);
  const [tileDefinitions, setTileDefinitions] = useState([]);
  const [entityDefinitions, setEntityDefinitions] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [map, setMap] = useState(null);
  const [ctrlHeld, setCtrlHeld] = useState(false);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [selectedArea, setSelectedArea] = useState({origin: {x: null, y: null}, point: {x: null, y: null}});

  const mapRef = useRef(null);

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
        if(validateMap(mapDefinition)) {
          setMap(mapDefinition);
          console.log("loaded map definitions: ", mapDefinition);
        }
        else {
          console.log("loaded map definitions not valid", mapDefinition);
        }
      })
    },[]
  );

  const handleKeyDown = (event) => {
    /// console.log("App::handleKeyUp - key pressed: ", event.key);
    switch (event.key) {
      case "Control":
        if (!ctrlHeld)
          setCtrlHeld(true);
        break;
      case "Shift":
        if (!shiftHeld)
          setShiftHeld(true);
        break;
      default:
        break;
    }
  }
  
  const handleKeyUp = (event) => {
    // console.log("App::handleKeyUp - key released: ", event.key);
    switch (event.key) {
      case "Control":
        setCtrlHeld(false);
        setSelectedArea({origin: {x: null, y: null}, point: {x: null, y: null}});
        break;
      case "Shift":
        setShiftHeld(false);
        setSelectedArea({origin: {x: null, y: null}, point: {x: null, y: null}});
        break;
      default:
        break;
    }
  }

  return (
    <div class="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <div class="header">
      </div>
      <div class="main">
        <div class="menu" tabIndex={0}>
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
            <Checkbox title="Focus" state={showFocusTile} setState={setShowFocusTile} />
            <Checkbox title="Chunk" state={showChunkGrid} setState={setShowChunkGrid} />
          </div>
          <div class="features">
            <h3>Features</h3>
            <Checkbox title="Keyboard Control" state={enableKeyboardControl} setState={setEnableKeyboardControl} />            
          </div>
          <ResolutionSelector setResolution={setTileResolution} resolutions={[8, 16, 32]} />
          <MapExporter map={map} />
        </div>
        <div class="canvas">
          <Map 
            tabIndex={1} 
            appState={{heldKeys: {ctrl: ctrlHeld, shift: shiftHeld}}}
            features={{ enableKeyboardControl: enableKeyboardControl }} 
            map={map} 
            setMap={setMap} 
            tileDefinitions={tileDefinitions} 
            entityDefinitions={entityDefinitions} 
            tileSize={tileResolution} 
            showTileGrid={showTileGrid} 
            showFocusTile={showFocusTile} 
            showChunkGrid={showChunkGrid} 
            selectedTile={selectedTile} 
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            mapRef={mapRef} 
            ref={mapRef} 
          />
        </div>
        <TilePicker 
          tabIndex={2} 
          definitions={tileDefinitions} 
          size={tileResolution} 
          setSelectedTile={setSelectedTile} 
          selectedTile={selectedTile} 
        />
      </div>
    </div>
  );
}

export default App;
