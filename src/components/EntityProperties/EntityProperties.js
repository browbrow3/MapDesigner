import './EntityProperties.css';

const EntityProperties = (props) => {
    return (
        <div class="entity-properties">
            <table>
                <tbody>
                    <tr title="Type ID of Entity"><td class="entity-prop-label">Type</td><td class="entity-prop-value">{props.definition.type}</td></tr>
                    <tr title="Name of Entity"><td class="entity-prop-label">Name</td><td class="entity-prop-value">{props.definition.name}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

export default EntityProperties;