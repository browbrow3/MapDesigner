// displays a tile.
import './ResolutionSelector.css';

const ResolutionSelector = (props) => {
    const handleSelectResolution = (event) => {
        props.setResolution(event.target.value);
    }

    return (
        <div class="resolution-selector">
            <h3>Resolution</h3>
            <select onChange={handleSelectResolution}>
                {props.resolutions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
        </div>
    );
}

export default ResolutionSelector;