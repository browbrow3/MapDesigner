import './EntityDefinition.css';
import Entity from '../Entity/Entity'
import EntityProperties from '../EntityProperties/EntityProperties';

const EntityDefinition = (props) => {
    const handleClick = () => {
        if(props.selectedEntity === props.definition.type) {
            props.setSelectedEntity(null);
        }
        else {
            props.setSelectedEntity(props.definition.type);
        }
    }

    return (
        <div id={`entity-definition-${props.definition.type}`} class={props.selectedEntity === props.definition.type ? "entity-definition-selected" : "entity-definition"} key={props.definition.type} onClick={handleClick}>
            <Entity definition={props.definition} entityResolution={props.entityResolution} />
            <EntityProperties definition={props.definition} />
        </div>
    );
}

export default EntityDefinition;