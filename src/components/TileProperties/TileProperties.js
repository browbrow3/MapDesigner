import React from 'react';
import './TileProperties.css';

const TileProperties = (props) => {
    return (
        <div class="tile-properties">
            <table>
                <tbody>
                    <tr title="Type ID of Tile"><td class="tile-prop-label">Type</td><td class="tile-prop-value">{props.definition.type}</td></tr>
                    <tr title="Name of Tile"><td class="tile-prop-label">Name</td><td class="tile-prop-value">{props.definition.name}</td></tr>
                    <tr title="Is the Tile tangiable? - can it be passed through?"><td class="tile-prop-label">Solid</td><td class="tile-prop-value">{props.definition.tangiable ? "true" : "false"}</td></tr>
                    <tr title="Speed multiplier for entities traversing the Tile"><td class="tile-prop-label">Speed</td><td class="tile-prop-value">{props.definition.speedMultiplier}</td></tr>
                    <tr title="Character to print to represent the Tile"><td class="tile-prop-label">Print</td><td class="tile-prop-value">{props.definition.printChar}</td></tr>
                    <tr title="Status Effects inflicted by the Tile when stepped on (bitmask)"><td class="tile-prop-label">Status Effects</td><td class="tile-prop-value">{props.definition.statusEffects}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

export default TileProperties;