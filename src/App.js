import './App.css';
import { useState, useEffect, useRef } from 'react';
import TilePicker from './components/TilePicker/TilePicker';
import EntityPicker from './components/EntityPicker/EntityPicker';
import Selector from './components/Selector/Selector';
import Map, { validateMap } from './components/Map/Map';
import MapExporter from './components/MapExporter/MapExporter';
import Checkbox from './components/Checkbox/Checkbox';

function App() {
  const [showTileGrid, setShowTileGrid] = useState(false);
  const [showFocusTile, setShowFocusTile] = useState(false);
  const [showChunkGrid, setShowChunkGrid] = useState(false);
  const [showEntities, setShowEntities] = useState(false);
  const [enableKeyboardControl, setEnableKeyboardControl] = useState(false);
  const [tileResolution, setTileResolution] = useState(8);
  const [entityResolution, setEntityResolution] = useState(16);
  const [tileDefinitions, setTileDefinitions] = useState([]);
  const [entityDefinitions, setEntityDefinitions] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [map, setMap] = useState(null);
  const [ctrlHeld, setCtrlHeld] = useState(false);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [selectedArea, setSelectedArea] = useState({origin: {x: null, y: null}, point: {x: null, y: null}});
  const [mode, setMode] = useState("tile");

  const mapRef = useRef(null);

  const clearSelectedTile = () => {
    setSelectedTile(null);
  };

  const clearSelectedEntity = () => {
    setSelectedEntity(null);
  }

  useEffect(() => {
    // console.log("getting tile definitions...")
    fetch ('http://localhost:3000/resources/tiles/tile-definitions.json')
      .then((result) => result.json())
      .then((definitions) => {
        setTileDefinitions(definitions);
        // console.log("loaded tile definitions: ", definitions);
      })
    },[]
  );

  useEffect(() => {
    // console.log("getting entity definitions...")
    fetch ('http://localhost:3000/resources/entities/entity-definitions.json')
      .then((result) => result.json())
      .then((definitions) => {
        setEntityDefinitions(definitions);
        // console.log("loaded entity definitions: ", definitions);
      })
    },[]
  );

  useEffect(() => {
    // console.log("getting map definition...")
    fetch ('http://localhost:3000/resources/map/map.json')
      .then((result) => result.json())
      .then((mapDefinition) => {
        if(validateMap(mapDefinition)) {
          setMap(mapDefinition);
          // console.log("loaded map definitions: ", mapDefinition);
        }
        else {
          // console.log("loaded map definitions not valid", mapDefinition);
        }
      })
    },[]
  );

  const handleKeyDown = (event) => {
    // console.log("App::handleKeyUp - key pressed: ", event.key);
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
  };
  
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
  };

  return (
    <div class="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <div class="header">
      </div>
      <div class="main">
        <div class="menu" tabIndex={0}>
          <div class="logo">
            <img alt="Map Designer Logo" src="devil-icon.png" />
          </div>
          <div class="mode">
            <Selector title="Mode" set={setMode} options={["tile", "entity"]} />
          </div>
          <div class={"selected-" + mode}>
            <h3>Selected {mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
            <p>{mode === "entity" ? selectedEntity : selectedTile}</p>
            <button id={"clear-selected-" + mode} onClick={mode === "entity" ? clearSelectedEntity : clearSelectedTile}>clear</button>
          </div>
          <div class="grid-settings">
            <h3>Grid Settings</h3>
            <Checkbox title="Tile" state={showTileGrid} setState={setShowTileGrid} />
            <Checkbox title="Focus" state={showFocusTile} setState={setShowFocusTile} />
            <Checkbox title="Chunk" state={showChunkGrid} setState={setShowChunkGrid} />
            <Checkbox title="Entities" state={showEntities} setState={setShowEntities} />
          </div>
          <div class="features">
            <h3>Features</h3>
            <Checkbox title="Keyboard Control" state={enableKeyboardControl} setState={setEnableKeyboardControl} />            
          </div>
          <div class="resolutions">
            <h3>Resolutions</h3>
            <Selector title="Tile" set={setTileResolution} options={[8, 16, 32]} selected={tileResolution} />
            <Selector title="Entity" set={setEntityResolution} options={[8, 16, 32]} selected={entityResolution} />
          </div>
          <MapExporter map={map} />
        </div>
        <div class="canvas">
          <Map 
            tabIndex={1} 
            appState={{mode, heldKeys: {ctrl: ctrlHeld, shift: shiftHeld}}} 
            features={{ enableKeyboardControl: enableKeyboardControl }} 
            map={map} 
            setMap={setMap} 
            tileDefinitions={tileDefinitions} 
            entityDefinitions={entityDefinitions} 
            tileResolution={tileResolution} 
            entityResolution={entityResolution}
            showTileGrid={showTileGrid} 
            showFocusTile={showFocusTile} 
            showChunkGrid={showChunkGrid} 
            showEntities={showEntities} 
            selectedTile={selectedTile} 
            selectedEntity={selectedEntity} 
            selectedArea={selectedArea} 
            setSelectedArea={setSelectedArea} 
            mapRef={mapRef} 
            ref={mapRef} 
          />
        </div>
        {
          mode === "entity" ? 
          <EntityPicker 
            tabIndex={2} 
            definitions={entityDefinitions} 
            entityResolution={entityResolution} 
            setSelectedEntity={setSelectedEntity} 
            selectedEntity={selectedEntity} 
          />
          : <TilePicker 
            tabIndex={2} 
            definitions={tileDefinitions} 
            tileResolution={tileResolution} 
            setSelectedTile={setSelectedTile} 
            selectedTile={selectedTile} 
          />
        }
      </div>
    </div>
  );
}

export default App;
