import './TilePicker.css';
import TileDefinition from '../TileDefinition/TileDefinition';

const TilePicker = (props) => {
    //console.log("TilePicker Props:", props);

    return (
        <div id="tile-picker" class="tile-picker" tabIndex={props.tabIndex}>
            {
                props.definitions.length > 0 ?
                    props.definitions.map((d) => 
                        <TileDefinition definition={d} size={props.size} setSelectedTile={props.setSelectedTile} selectedTile={props.selectedTile} />
                    ) :
                    'Loading...'
            }
        </div>
    );
}

export default TilePicker;