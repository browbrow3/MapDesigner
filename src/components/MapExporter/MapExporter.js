// button exporting a snapshot of the map when pressed.
import './MapExporter.css';

const MapExporter = (props) => {
    // console.log("MapExporter Props: ", props);
    
    const formatFileName = () => {
        const date = new Date();
        return `map-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getUTCHours()}${date.getMinutes()}${date.getSeconds()}.json`;
    }

    const exportMap = () => {
        const data = new Blob([JSON.stringify(props.map)], {type: 'application/json'});
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = formatFileName();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div class="map-exporter">
            <button onClick={exportMap}>
                <h3>Export Map</h3>
            </button>
        </div>
    );
}

export default MapExporter;