// displays an entity.
import './Entity.css';

const Entity = (props) => {
    // console.log("Entity Props:", props);
    
    const getId = () => `entity-${props.definition.type}`;

    return (
        <div id={getId()} class="entity">
            <img alt={`Entity ${props.definition.type} at entityResolution ${props.entityResolution}p`} src={props.definition.type === -1 ? "resources/entities/default-entity.png" : `resources/entities/${props.entityResolution}p/sprite_${props.definition.type}_0_1_0.png`}/>
        </div>
    );
}

export default Entity;