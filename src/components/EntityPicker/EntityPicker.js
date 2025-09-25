import './EntityPicker.css';
import EntityDefinition from '../EntityDefinition/EntityDefinition';

const EntityPicker = (props) => {
    //console.log("EntityPicker Props:", props);

    return (
        <div id="entity-picker" class="entity-picker" tabIndex={props.tabIndex}>
            {
                props.definitions.length > 0 ?
                    props.definitions.map((d) => 
                        <EntityDefinition 
                            definition={d} 
                            entityResolution={props.entityResolution} 
                            setSelectedEntity={props.setSelectedEntity} 
                            selectedEntity={props.selectedEntity} 
                        />
                    ) :
                    'Loading...'
            }
        </div>
    );
}

export default EntityPicker;